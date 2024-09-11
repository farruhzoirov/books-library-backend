import { Request, Response } from 'express';
import { AuthorsService } from "../services/author.service";

const { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = new AuthorsService();

// POST /authors
export const createAuthorHandler = async (req: Request, res: Response) => {
  return createAuthor(req, res);
};

// GET /authors
export const getAuthorsHandler = async (req: Request, res: Response) => {
  return getAuthors(req, res);
};

// GET /authors/:id
export const getAuthorByIdHandler = async (req: Request, res: Response) => {
  return getAuthorById(req, res);
};

// PUT /authors/:id
export const updateAuthorHandler = async (req: Request, res: Response) => {
  return updateAuthor(req, res);
};

// DELETE /authors/:id
export const deleteAuthorHandler = async (req: Request, res: Response) => {
  return deleteAuthor(req, res);
};
