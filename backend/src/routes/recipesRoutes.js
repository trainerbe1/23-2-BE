import express from 'express';
import recipesController from '../controller/recipesController.js';
import { upload } from '../services/storageService.js';

const recipesRouter = new express.Router();

recipesRouter.post('/recipes',upload.single('recipePicture'), recipesController.addRecipe);
recipesRouter.get('/recipes', recipesController.getRecipe);
recipesRouter.get('/recipes/:recipeId', recipesController.getRecipeById);
recipesRouter.delete('/recipes/:recipeId', recipesController.deleteRecipeById);

export default recipesRouter;