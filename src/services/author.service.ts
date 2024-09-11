import { Request, Response } from 'express';
import { handleError } from "../utils/error";
import Author, { IAuthor } from "../models/author.model";
import { handleResponse } from "../utils/response";

export class AuthorsService {
  async createAuthor(req: Request, res: Response) {
    try {
      const { name, biography } = req.body;
      const newAuthor = new Author({ name, biography });
      await newAuthor.save();
      return handleResponse(res, 201, true, 'Author created successfully');
    } catch (error) {
      handleError(res, error, 'Creating Author Service');
    }
  }

  async getAuthors(req: Request, res: Response) {
    try {
      const authors = await Author.find();
      if (!authors.length) {
        return handleResponse(res, 404, false, 'Authors not found');
      }
      return handleResponse(res, 200, true, 'Authors here', '', authors);
    } catch (error) {
      handleError(res, error, 'Getting Authors Service');
    }
  }

  async getAuthorById(req: Request, res: Response) {
    try {
      const authorId = req.params.id as string;
      const author = await Author.findById(authorId);
      if (!author) {
        return handleResponse(res, 404, false, 'Author not found');
      }
      return handleResponse(res, 200, true, 'Author here', '', author);
    } catch (error) {
      handleError(res, error, 'Getting Author By Id Service');
    }
  }

  async updateAuthor(req: Request, res: Response) {
    try {
      const authorId = req.params.id as string;
      const updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body, { new: true });
      if (!updatedAuthor) {
        return handleResponse(res, 400, false, "Author couldn't be updated");
      }
      return handleResponse(res, 200, true, 'Author updated successfully');
    } catch (error) {
      handleError(res, error, 'Updating Author By Id Service');
    }
  }

  async deleteAuthor(req: Request, res: Response) {
    try {
      const authorId = req.params.id as string;
      const deletedAuthor = await Author.findByIdAndDelete(authorId);
      if (!deletedAuthor) {
        return handleResponse(res, 400, false, "Author couldn't be deleted");
      }
      return handleResponse(res, 200, true, 'Author deleted successfully');
    } catch (error) {
      handleError(res, error, 'Deleting Author By Id Service');
    }
  }
}
