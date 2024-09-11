import {Request, Response} from 'express';

import {BooksService} from "../services/books.service";

const {createBook, getBooks, getBookById, updateBook, deleteBook } = new BooksService();

// POST /books
export const createBookHandler = async (req: Request, res: Response) => {
   return createBook(req, res)
};

// GET /books
export const getBooksHandler = async (req: Request, res: Response) => {
   return getBooks(req, res);
};

// GET /books/:id
export const getBookByIdHandler = async (req: Request, res: Response) => {
  return getBookById(req, res);
};

// PUT /books/:id
export const updateBookHandler = async (req: Request, res: Response) => {
  return updateBook(req, res);
};

// DELETE /books/:id
export const deleteBookHandler = async (req: Request, res: Response) => {
  return deleteBook(req, res);
};