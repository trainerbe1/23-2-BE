import express from "express";
import categoryController from '../controller/categoryController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const categoryRouter = new express.Router();
categoryRouter.get('/categories', categoryController.getAllCategory);
categoryRouter.get('/categories/:categoryId', categoryController.getCategoryById);
categoryRouter.post('/categories', categoryController.createCategory);
categoryRouter.delete('/categories/:categoryId', categoryController.deleteCategory);
categoryRouter.put('/categories/:categoryId', categoryController.updateCategory);

export default categoryRouter;