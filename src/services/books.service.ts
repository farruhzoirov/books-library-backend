import {Request, Response} from "express";
import {handleError} from "../utils/error";

import IAuthor from "../models/author.model";
import ICategory from "../models/category.model";
import IBook from "../models/book.model";
import {handleResponse} from "../utils/response";

export class BooksService {
  async createBook(req: Request, res: Response) {
    try {
      const {title, authorName, categoryName, publishedYear, summary} = req.body;

      const [author, category] = await Promise.all([
        IAuthor.findOne({name: authorName}).select('_id name'),
        ICategory.findOne({name: categoryName}).select('_id name')
      ]);

      if (!author) {
        return handleResponse(res, 404, false, 'Author not found');
      }

      if (!category) {
        return handleResponse(res, 404, false, 'Category not found');
      }

      const newBook = new IBook({
        title,
        author: author._id,
        category: category._id,
        publishedYear,
        summary
      });
      await newBook.save();
      return handleResponse(res, 201, true, 'Book created successfully')
    } catch (error) {
      handleError(res, error, 'Creating Book Service');
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const searchQuery = req.query.search as string;
      let query = {};
      
      if (searchQuery) {
        query = {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { summary: { $regex: searchQuery, $options: 'i' } }
          ]
        };
      }

      const [books, total] = await Promise.all([
        IBook.find(query)
          .select('title author category publishedYear summary createdAt')
          .populate('author', 'name bio')
          .populate('category', 'name description')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        IBook.countDocuments(query)
      ]);

      if (!books.length) {
        return handleResponse(res, 404, false, 'Books not found');
      }

      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      };

      return handleResponse(res, 200, true, 'Books retrieved successfully', '', {
        books,
        pagination
      });

    } catch (error) {
      handleError(res, error, 'Getting Books Service');
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const bookId = req.params.id as string;
      
      const book = await IBook.findById(bookId)
        .populate('author', 'name bio')
        .populate('category', 'name description')
        .lean();
        
      if (!book) {
        return handleResponse(res, 404, false, 'Book not found');
      }
      
      return handleResponse(res, 200, true, 'Book retrieved successfully', '', book)

    } catch (error) {
      handleError(res, error, 'Getting Book By Id Service');
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id as string;
      const updateData = req.body;

      if (updateData.authorName || updateData.categoryName) {
        const promises = [];
        
        if (updateData.authorName) {
          promises.push(
            IAuthor.findOne({name: updateData.authorName}).select('_id')
          );
        }
        
        if (updateData.categoryName) {
          promises.push(
            ICategory.findOne({name: updateData.categoryName}).select('_id')
          );
        }

        const results = await Promise.all(promises);
        
        if (updateData.authorName && !results[0]) {
          return handleResponse(res, 404, false, 'Author not found');
        }
        
        if (updateData.categoryName && !results[promises.length - 1]) {
          return handleResponse(res, 404, false, 'Category not found');
        }

        if (updateData.authorName && results[0]) {
          updateData.author = results[0]._id;
          delete updateData.authorName;
        }
        
        if (updateData.categoryName && results[promises.length - 1]) {
          updateData.category = results[promises.length - 1]!._id;
          delete updateData.categoryName;
        }
      }

      const updatedBook = await IBook.findByIdAndUpdate(
        bookId, 
        updateData, 
        { new: true, runValidators: true }
      );
      
      if (!updatedBook) {
        return handleResponse(res, 400, false, "Book couldn't be updated");
      }
      
      return handleResponse(res, 200, true, 'Book updated successfully')

    } catch (error) {
      handleError(res, error, 'Updating Book By Id Service');
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id as string;
      
      const deletedBook = await IBook.findByIdAndDelete(bookId);
      
      if (!deletedBook) {
        return handleResponse(res, 400, false, "Book couldn't be deleted");
      }
      
      return handleResponse(res, 200, true, 'Book deleted successfully')

    } catch (error) {
      handleError(res, error, 'Deleting Book By Id Service');
    }
  }
}