import {Router} from 'express';
import {
  createBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler
} from '../controllers/books.controller';
import {authMiddleware} from "../middleware/auth.middleware";
import bookValidator from "../validators/books.validator";

const router: Router = Router();

// Books Routes

// GET /books
router.get('/books', getBooksHandler);

// GET /books/:id
router.get('/books/:id', getBookByIdHandler);


// POST /books
router.post('/books/', authMiddleware, bookValidator, createBookHandler);


// PUT /books/:id
router.put('/books/:id', authMiddleware, bookValidator, updateBookHandler);


// DELETE /books/:id
router.delete('/books/:id', authMiddleware, bookValidator, deleteBookHandler);

export default router