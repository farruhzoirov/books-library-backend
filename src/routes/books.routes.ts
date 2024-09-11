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
router.get('/books', getBooksHandler);

router.get('/books/:id', getBookByIdHandler);

router.post('/books/', authMiddleware, bookValidator, createBookHandler);

router.put('/books/:id', authMiddleware, bookValidator, updateBookHandler);

router.delete('/books/:id', authMiddleware, bookValidator, deleteBookHandler);

export default router