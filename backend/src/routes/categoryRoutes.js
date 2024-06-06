import express from "express";
import categoryController from '../controller/categoryController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const categoryRouter = new express.Router();
categoryRouter.get('/category', categoryController.getAllCategory);
categoryRouter.get('/category/:categoryId', categoryController.getCategoryById);
categoryRouter.post('/category', categoryController.createCategory);
categoryRouter.delete('/category/:categoryId', categoryController.deleteCategory);
categoryRouter.put('/category/:categoryId', categoryController.updateCategory);

export default categoryRouter;