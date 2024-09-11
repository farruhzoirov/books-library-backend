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

      const author = await IAuthor.findOne({name: authorName});
      if (!author) {
        return handleResponse(res, 404, false, 'Author not found');
      }

      const category = await ICategory.findOne({name: categoryName});
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
      const books = await IBook.find().populate('author').populate('category');
      if (!books.length) {
        return handleResponse(res, 404, false, 'Books not found');
      }
      return handleResponse(res, 200, true, 'Books here', '', books)

    } catch (error) {
      handleError(res, error, 'Getting Books Service');
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const bookId = req.params.id as string;
      const book = await IBook.findById(bookId).populate('author').populate('category');
      if (!book) {
        return handleResponse(res, 404, false, 'Book not found');
      }
      return handleResponse(res, 200, true, 'Book here', '', book)

    } catch (error) {
      handleError(res, error, 'Getting Book By Id Service');
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id as string;
      const updatedBook = await IBook.findByIdAndUpdate(bookId, req.body, {new: true});
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