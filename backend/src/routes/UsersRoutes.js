import express from "express";
import usersController from '../controller/UsersController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const UsersRouter = new express.Router();
UsersRouter.post('/users/register', usersController.register);
UsersRouter.post('/users/login', usersController.login);
UsersRouter.get('/users/:userId', authMiddleware, usersController.getUserById);
UsersRouter.patch('/users/:userId', authMiddleware, usersController.editUserById);
UsersRouter.put('/users/:userId/change-password', authMiddleware, usersController.editPasswordById);
UsersRouter.put('/users/:userId/change-email', usersController.editEmail);
UsersRouter.put('/users/:userId/user-delete',authMiddleware, usersController.deleteUser);
UsersRouter.delete('/users/logout', authMiddleware, usersController.logout);

export default UsersRouter;