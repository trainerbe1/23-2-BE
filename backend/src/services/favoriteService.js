import { prismaClient } from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { nanoid } from 'nanoid';

const getAllFavorites = async () => {
  return prismaClient.favorite.findMany({
    include: {
      user: true,
      recipe: true,
    },
  });
};

const getFavoriteById = async (id) => {
  const favorite = await prismaClient.favorite.findUnique({
    where: { id: id },
    include: {
      user: true,
      recipe: true,
    },
  });

  if (!favorite) {
    throw new Error('Favorite not found, id undefined');
  }

  return favorite;
};

const addFavorite = async (payload) => {
  const newFavorite = {
    id: `favorite-${nanoid(16)}`,
    user_id: payload.user_id,
    recipe_id: payload.recipe_id,
  };

  return prismaClient.favorite.create({
    data: newFavorite,
  });
};

const deleteFavorite = async (id) => {
  const favorite = await prismaClient.favorite.delete({
    where: { id: id },
  });

  if(!favorite) {
    throw new NotFoundError('id not found');
  }

  return favorite;
};
    
export default { getAllFavorites, getFavoriteById, addFavorite, deleteFavorite};
