import { Request, Response } from 'express';
import { CategoriesService } from "../services/category.service";

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = new CategoriesService();


export const createCategoryHandler = async (req: Request, res: Response) => {
  return createCategory(req, res);
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
  return getCategories(req, res);
};


export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  return getCategoryById(req, res);
};


export const updateCategoryHandler = async (req: Request, res: Response) => {
  return updateCategory(req, res);
};


export const deleteCategoryHandler = async (req: Request, res: Response) => {
  return deleteCategory(req, res);
};
