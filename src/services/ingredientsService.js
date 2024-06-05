// import { loginUserValidator, patchUserValidator, putUserChangeEmailValidator, putUserChangePasswordValidator, registerUserValidator } from "../validator/usersValidator.js";
// import { validate } from "../validator/index.js";
import {prismaClient} from '../library/database.js';
// import { InvariantError } from "../exceptions/InvariantError.js";
// import { AuthenticationError } from "../exceptions/AuthenticationError.js";
// import { NotFoundError } from "../exceptions/NotFoundError.js";
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

export default { getIngredients, addIngredient};