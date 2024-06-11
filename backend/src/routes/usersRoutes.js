import express from "express";
import usersController from '../controller/usersController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { upload } from "../services/storageService.js";

const usersRouter = new express.Router();
usersRouter.post('/users/register', usersController.register);
usersRouter.post('/users/login', usersController.login);
usersRouter.get('/users/:userId', authMiddleware, usersController.getUserById);
usersRouter.patch('/users/:userId', authMiddleware, usersController.editUserById);
usersRouter.put('/users/:userId/change-password', authMiddleware, usersController.editPasswordById);
usersRouter.put('/users/:userId/change-email', usersController.editEmail);
usersRouter.put('/users/:userId/user-delete',authMiddleware, adminMiddleware, usersController.deleteUser);
usersRouter.patch('/users/:userId/avatar' , upload.single('profilePicture'), usersController.editAvatar);
usersRouter.delete('/users/logout', authMiddleware, usersController.logout);

export default usersRouter;