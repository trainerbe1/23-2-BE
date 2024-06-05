import express from "express";
import ingredientsController from "../controller/ingredientsController.js";

const ingredientsRouter = new express.Router();

ingredientsRouter.post('/ingredients', ingredientsController.addIngredient);
ingredientsRouter.get('/ingredients', ingredientsController.getIngredients);
ingredientsRouter.patch('/ingredients/:ingredientId', ingredientsController.editIngredientById);


export default ingredientsRouter;