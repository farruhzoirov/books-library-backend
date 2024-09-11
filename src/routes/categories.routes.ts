import { Router } from 'express';
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/category.controller';
import CategoryValidator from "../validators/category.validator";
import {authMiddleware} from "../middleware/auth.middleware";

const router: Router = Router();

// POST /categories
router.post('/category', authMiddleware, CategoryValidator, createCategoryHandler);

// GET /categories
router.get('/categories',  getCategoriesHandler);

// GET /categories/:id
router.get('/category/:id', getCategoryByIdHandler);

// PUT /categories/:id
router.put('/category/:id',  authMiddleware, updateCategoryHandler);

// DELETE /categories/:id
router.delete('/category/:id', authMiddleware , deleteCategoryHandler);

export default router;
