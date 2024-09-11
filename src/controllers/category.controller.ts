import { Request, Response } from 'express';
import { CategoriesService } from "../services/category.service";

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = new CategoriesService();

// POST /categories
export const createCategoryHandler = async (req: Request, res: Response) => {
  return createCategory(req, res);
};

// GET /categories
export const getCategoriesHandler = async (req: Request, res: Response) => {
  return getCategories(req, res);
};

// GET /categories/:id
export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  return getCategoryById(req, res);
};

// PUT /categories/:id
export const updateCategoryHandler = async (req: Request, res: Response) => {
  return updateCategory(req, res);
};

// DELETE /categories/:id
export const deleteCategoryHandler = async (req: Request, res: Response) => {
  return deleteCategory(req, res);
};
