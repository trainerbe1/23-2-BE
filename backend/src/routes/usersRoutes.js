import express from "express";
import usersController from '../controller/usersController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const usersRouter = new express.Router();
usersRouter.post('/users/register', usersController.register);
usersRouter.post('/users/login', usersController.login);
usersRouter.get('/users/:userId', authMiddleware, usersController.getUserById);
usersRouter.patch('/users/:userId', authMiddleware, usersController.editUserById);
usersRouter.put('/users/:userId/change-password', authMiddleware, usersController.editPasswordById);
usersRouter.put('/users/:userId/change-email', usersController.editEmail);
usersRouter.put('/users/:userId/user-delete',authMiddleware, usersController.deleteUser);
usersRouter.delete('/users/logout', authMiddleware, usersController.logout);

export default usersRouter;