import express from 'express';
import mealPlanItemsController from '../controller/mealPlanItemsController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";


const mealPlanItemsRouter = express.Router();

mealPlanItemsRouter.get('/mealPlanItems', authMiddleware, mealPlanItemsController.getAllMealPlanItems);
mealPlanItemsRouter.get('/mealPlanItems/:id', authMiddleware, mealPlanItemsController.getMealPlanItemsById);
mealPlanItemsRouter.post('/mealPlanItems', authMiddleware, mealPlanItemsController.addMealPlanItems);
mealPlanItemsRouter.delete('/mealPlanItems/:id', authMiddleware, mealPlanItemsController.deleteMealPlanItems);
mealPlanItemsRouter.put('/mealPlanItems/:id', authMiddleware, mealPlanItemsController.updateMealPlanItems);

export default mealPlanItemsRouter;
