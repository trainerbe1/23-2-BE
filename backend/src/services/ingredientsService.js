import { NotFoundError } from '../exceptions/NotFoundError.js';
import {prismaClient} from '../library/database.js';
import {nanoid} from 'nanoid';
import { createIngredientValidator, updateIngredientValidator } from '../validator/ingredientsValidator.js';
import { validate } from '../validator/index.js';

const addIngredient = async (payload) => {
  const ingredient = validate(createIngredientValidator, payload);

  const newIngredient = {
    id: `ingredient-${nanoid(16)}`,
    name: ingredient.name,
    unit: ingredient.unit,
    quantity: ingredient.quantity
  };


  return await prismaClient.ingredient.create({
    data: newIngredient,
    select: {
      id: true,
    }
  });
};

const getIngredients = async() => {
  const ingredients = await prismaClient.ingredient.findMany({
    select: {
      id: true,
      name: true,
      unit: true,
      quantity: true,
      created_at: true,
      updated_at: true,
    }
  });

  const ingredientMap = ingredients.map((i) => ({
    id: i.id,
    name: i.name,
    unit: i.unit,
    quantity: i.quantity,
    createdAt: i.created_at,
    updatedAt: i.updated_at
  }));

  return ingredientMap;
};

const editIngredientById = async(id, payload) => {
  const ingredientRequest = validate(updateIngredientValidator, payload);

  const ingredient = await prismaClient.ingredient.findUnique({
    where:{
      id: id,
    },
  });

  if(!ingredient) {
    throw new NotFoundError('id not found');
  }

  return await prismaClient.ingredient.update({
    where: {
      id: id
    },
    data: {
      name: ingredientRequest.name,
      unit: ingredientRequest.unit,
      quantity: ingredient.quantity
    },
    select: {
      id: true,
    }
  });
};

const deleteIngredientById = async(id) => {
  const ingredient = await prismaClient.ingredient.findUnique({
    where:{
      id: id
    }
  });

  if(!ingredient) {
    throw new NotFoundError('id not found');
  }

  return await prismaClient.ingredient.delete({
    where:{
      id: id
    }
  });
};

export default { getIngredients, addIngredient, editIngredientById, deleteIngredientById};