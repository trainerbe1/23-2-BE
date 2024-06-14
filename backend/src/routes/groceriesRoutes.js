import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import groceriesController from "../controller/groceriesController.js";

const groceriesRouter = new express.Router();

groceriesRouter.post('/groceries', authMiddleware, groceriesController.addGrocery);
groceriesRouter.get('/groceries', authMiddleware, groceriesController.getGroceries);
groceriesRouter.get('/groceries/:groceryId', authMiddleware, groceriesController.getGroceryById);
groceriesRouter.delete('/groceries/:groceryId',authMiddleware, groceriesController.deleteGroceryById);


export default groceriesRouter;