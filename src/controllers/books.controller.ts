import {Request, Response} from 'express';

import {BooksService} from "../services/books.service";

const {createBook, getBooks, getBookById, updateBook, deleteBook } = new BooksService();


export const createBookHandler = async (req: Request, res: Response) => {
   return createBook(req, res)
};


export const getBooksHandler = async (req: Request, res: Response) => {
   return getBooks(req, res);
};


export const getBookByIdHandler = async (req: Request, res: Response) => {
  return getBookById(req, res);
};


export const updateBookHandler = async (req: Request, res: Response) => {
  return updateBook(req, res);
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  return deleteBook(req, res);
};
