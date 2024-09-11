import { Request, Response } from 'express';
import { AuthorsService } from "../services/author.service";

const { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = new AuthorsService();

export const createAuthorHandler = async (req: Request, res: Response) => {
  return createAuthor(req, res);
};


export const getAuthorsHandler = async (req: Request, res: Response) => {
  return getAuthors(req, res);
};

export const getAuthorByIdHandler = async (req: Request, res: Response) => {
  return getAuthorById(req, res);
};


export const updateAuthorHandler = async (req: Request, res: Response) => {
  return updateAuthor(req, res);
};

export const deleteAuthorHandler = async (req: Request, res: Response) => {
  return deleteAuthor(req, res);
};
