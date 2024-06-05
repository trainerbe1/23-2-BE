import { NotFoundError } from '../exceptions/NotFoundError.js';
import {prismaClient} from '../library/database.js';
import {nanoid} from 'nanoid';

const addIngredient = async(payload) => {
  // const user = validate(registerUserValidator, payload);

  const newIngredient = {
    id: `ingredient-${nanoid(16)}`,
    name: payload.name,
    unit: payload.unit,
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
      created_at: true,
      updated_at: true,
    }
  });

  const ingredientMap = ingredients.map((i) => ({
    id: i.id,
    name: i.name,
    unit: i.unit,
    createdAt: i.created_at,
    updatedAt: i.updated_at
  }));

  return ingredientMap;
};

const editIngredientById = async(id, payload) => {
  const ingredient = await prismaClient.ingredient.findUnique({
    where:{
      id: id,
    },
  });

  if(!ingredient) {
    throw new NotFoundError('id not found');
  }

  const data = {};

  if(ingredient.name) {
    data.nama = ingredient.name;
  }

  if(ingredient.unit) {
    data.unit = ingredient.unit;
  }

  return await prismaClient.ingredient.update({
    where: {
      id: id
    },
    data: data,
    select: {
      id: true,
    }
  });
};

const deleteIngredientById = async(id) => {
  const user = await prismaClient.ingredient.update({
    where:{
      id: id
    },
    data:{
      is_delete: true
    }
  });

  if(!user) {
    throw new NotFoundError('id not found');
  }
}

export default { getIngredients, addIngredient, editIngredientById};