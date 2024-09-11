import { Request, Response } from 'express';
import { handleError } from "../utils/error";
import  ICategory  from "../models/category.model";
import { handleResponse } from "../utils/response";
import mongoose from "mongoose";

export class CategoriesService {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const newCategory = new ICategory({ name, description });
      await newCategory.save();
      return handleResponse(res, 201, true, 'Category created successfully');
    } catch (error) {
      handleError(res, error, 'Creating Category Service');
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await ICategory.find();
      console.log(categories)
      if (!categories.length) {
        return handleResponse(res, 404, false, 'Categories not found');
      }
      return handleResponse(res, 200, true, 'Categories here', '', categories);
    } catch (error) {
      handleError(res, error, 'Getting Categories Service');
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id as string;
      const category = await ICategory.findById(categoryId);
      if (!category) {
        return handleResponse(res, 404, false, 'Category not found');
      }
      return handleResponse(res, 200, true, 'Category here', '', category);
    } catch (error) {
      handleError(res, error, 'Getting Category By Id Service');
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.id as string;

      console.log("Category ID:", categoryId);
      console.log("Request Body:", req.body);

      // Check if categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return handleResponse(res, 400, false, 'Invalid category ID');
      }
      const updatedCategory = await ICategory.findByIdAndUpdate(categoryId, req.body, { new: true });
      if (!updatedCategory) {
        return handleResponse(res, 400, false, "Category couldn't be updated");
      }
      return handleResponse(res, 200, true, 'Category updated successfully');
    } catch (error) {
      handleError(res, error, 'Updating Category By Id Service');
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.id as string;
      const deletedCategory = await ICategory.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        return handleResponse(res, 400, false, "Category couldn't be deleted");
      }
      return handleResponse(res, 200, true, 'Category deleted successfully');
    } catch (error) {
      handleError(res, error, 'Deleting Category By Id Service');
    }
  }
}
