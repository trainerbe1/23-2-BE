import express from 'express';
import favoriteController from '../controller/favoriteController.js';

const favoriteRouter = new express.Router();

favoriteRouter.get('/favorites', favoriteController.getAllFavorites);
favoriteRouter.get('/favorites/:id', favoriteController.getFavoriteById);
favoriteRouter.post('/favorites', favoriteController.addFavorite);
favoriteRouter.delete('/favorites/:id', favoriteController.deleteFavorite);

export default favoriteRouter;