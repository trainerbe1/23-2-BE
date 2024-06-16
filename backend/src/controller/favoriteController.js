import favoriteService from '../services/favoriteService.js';

const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getAllFavorites();
    res.status(200).json({
      status: 'success',
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

const getFavoriteById = async (req, res, next) => {
  try {
    const favorite = await favoriteService.getFavoriteById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addFavorite(req.body);
    res.status(201).json({
      status: 'success',
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    await favoriteService.deleteFavorite(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'favorite berhasil dihapus!'
    });
  } catch (error) {
    next(error);
  }
};

export default { getAllFavorites, getFavoriteById, addFavorite, deleteFavorite};