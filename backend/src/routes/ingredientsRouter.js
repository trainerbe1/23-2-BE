import express from "express";
import ingredientsController from "../controller/ingredientsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const ingredientsRouter = new express.Router();

ingredientsRouter.post('/ingredients', authMiddleware, adminMiddleware, ingredientsController.addIngredient);
ingredientsRouter.get('/ingredients', authMiddleware, ingredientsController.getIngredients);
ingredientsRouter.put('/ingredients/:ingredientId', authMiddleware, adminMiddleware, ingredientsController.editIngredientById);
ingredientsRouter.delete('/ingredients/:ingredientId',authMiddleware, adminMiddleware, ingredientsController.deleteIngredientById);


export default ingredientsRouter;