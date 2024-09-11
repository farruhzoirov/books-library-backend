import { Router } from 'express';
import {
  createAuthorHandler,
  getAuthorsHandler,
  getAuthorByIdHandler,
  updateAuthorHandler,
  deleteAuthorHandler
} from '../controllers/author.controller';

import AuthorValidator from "../validators/author.validator";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

// POST /authors
router.post('/author/', authMiddleware, AuthorValidator, createAuthorHandler);

// GET /authors
router.get('/authors/' , getAuthorsHandler);

// GET /authors/:id
router.get('/author/:id', getAuthorByIdHandler);

// PUT /authors/:id
router.put('/author/:id', authMiddleware, AuthorValidator, updateAuthorHandler);

// DELETE /authors/:id
router.delete('/author/:id', authMiddleware, AuthorValidator, deleteAuthorHandler);

export default router;
