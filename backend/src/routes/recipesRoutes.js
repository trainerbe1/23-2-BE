import express from 'express';
import recipesController from '../controller/recipesController.js';
import { upload } from '../services/storageService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const recipesRouter = new express.Router();

recipesRouter.post('/recipes',upload.single('recipePicture'),authMiddleware, adminMiddleware, recipesController.addRecipe);
recipesRouter.get('/recipes', recipesController.getRecipe);
recipesRouter.get('/recipes/:recipeId',authMiddleware, recipesController.getRecipeById);
recipesRouter.patch('/recipes/:recipeId',upload.single('recipePicture'),authMiddleware, adminMiddleware, recipesController.editRecipeById);
recipesRouter.delete('/recipes/:recipeId',authMiddleware, adminMiddleware, recipesController.deleteRecipeById);

export default recipesRouter;