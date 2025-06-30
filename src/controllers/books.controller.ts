import {Request, Response} from 'express';

import {BooksService} from "../services/books.service";

// Use singleton pattern for better performance
const booksService = new BooksService();

export const createBookHandler = async (req: Request, res: Response) => {
   return booksService.createBook(req, res)
};

export const getBooksHandler = async (req: Request, res: Response) => {
   return booksService.getBooks(req, res);
};

export const getBookByIdHandler = async (req: Request, res: Response) => {
  return booksService.getBookById(req, res);
};

export const updateBookHandler = async (req: Request, res: Response) => {
  return booksService.updateBook(req, res);
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  return booksService.deleteBook(req, res);
};
