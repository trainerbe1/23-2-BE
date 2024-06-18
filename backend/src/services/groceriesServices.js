import { NotFoundError } from '../exceptions/NotFoundError.js';
import {prismaClient} from '../library/database.js';
import {nanoid} from 'nanoid';
import { validate } from '../validator/index.js';
import { createGroceryValidator } from '../validator/groceriesValidator.js';
import { AuthorizationError } from '../exceptions/AuthorizationError.js';

const addGrocery = async (payload, userId) => {
  const grocery = validate(createGroceryValidator, payload);

  return await prismaClient.grocery.create({
    data: {
      id: `grocery-${nanoid(16)}`,
      user:{
        connect: {
          id: userId
        }
      },
      recipe: {
        connect: {
          id: grocery.recipeId
        }
      }
    },
    select: {
      id: true,
    }
  });
};

const getGroceries = async () => {
  const groceries = await prismaClient.grocery.findMany({
    include: {
      recipe: {
        select: {
          recipe_picture: true,
          name: true,
          ingredients: {
            select: {
              name: true,
              unit: true,
              quantity: true
            }
          }
        }
      }
    },
  });

  return groceries.map(grocery => ({
    id: grocery.id,
    userId: grocery.user_id,
    recipe: {
      recipe_picture: grocery.recipe.recipe_picture,
      name: grocery.recipe.name,
      ingredients: grocery.recipe.ingredients
    }
  }));
};


const getGroceryById = async(id) => {
  const grocery = await prismaClient.grocery.findUnique({
    where:{
      id: id,
    },
    include: {
      recipe: {
        select: {
          recipe_picture: true,
          name: true,
          ingredients: {
            select: {
              name: true,
              unit: true,
              quantity: true
            }
          }
        }
      }
    },
  });

  if(!grocery) {
    throw new NotFoundError('Id not found');
  }

    return {
      id: grocery.id,
      userId: grocery.user_id,
      recipe: {
        recipe_picture: grocery.recipe.recipe_picture,
        name: grocery.recipe.name,
        ingredients: grocery.recipe.ingredients
      }
    };
};

const verifyGroceriesOwner = async(id, userId) => {
  const owner = await prismaClient.grocery.findUnique({
    where: {
      id: id,
    },
    select: {
      user_id: true
    }
  });

  if(!owner) {
    throw new NotFoundError('Id not found');
  }

  if(owner.user_id !== userId) {
    throw new AuthorizationError('restricted resource');
  }
};

const deleteGroceyById = async(id) => {
  const grocery = await prismaClient.grocery.findUnique({
    where:{
      id: id
    }
  });

  if(!grocery) {
    throw new NotFoundError('id not found');
  }

  return await prismaClient.grocery.delete({
    where:{
      id: id
    }
  });
};

export default { addGrocery, getGroceries, getGroceryById, verifyGroceriesOwner, deleteGroceyById};