import express from 'express';
import recipesController from '../controller/recipesController.js';
import { upload } from '../services/storageService.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';
// import { adminMiddleware } from '../middleware/adminMiddleware.js';

const recipesRouter = new express.Router();

recipesRouter.post('/recipes', recipesController.addRecipe);
recipesRouter.post('/recipes/file-upload', upload.single('recipePicture'), recipesController.uploadRecipePicture);
recipesRouter.get('/recipes', recipesController.getRecipe);
recipesRouter.get('/recipes/:recipeId', recipesController.getRecipeById);
recipesRouter.patch('/recipes/:recipeId', recipesController.editRecipeById);
recipesRouter.delete('/recipes/:recipeId', recipesController.deleteRecipeById);

export default recipesRouter;