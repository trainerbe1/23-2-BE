import express from "express";
import {register, login, getUserById, logout} from '../controller/UsersController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const UsersRouter = new express.Router();
UsersRouter.post('/users/register', register);
UsersRouter.post('/users/login', login);
UsersRouter.get('/users/:userId',authMiddleware, getUserById)
UsersRouter.delete('/users/logout',authMiddleware, logout)

export default UsersRouter