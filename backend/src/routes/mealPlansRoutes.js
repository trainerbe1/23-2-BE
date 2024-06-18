import express from 'express';
import mealPlansController from '../controller/mealPlansController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";


const mealPlansRouter = express.Router();

mealPlansRouter.get('/mealPlans', authMiddleware, mealPlansController.getAllMealPlans);
mealPlansRouter.get('/mealPlans/:id', authMiddleware, mealPlansController.getMealPlansById);
mealPlansRouter.post('/mealPlans', authMiddleware, mealPlansController.addMealPlans);
mealPlansRouter.delete('/mealPlans/:id', authMiddleware, mealPlansController.deleteMealPlans);
mealPlansRouter.put('/mealPlans/:id', authMiddleware, mealPlansController.updateMealPlans);

export default mealPlansRouter;
