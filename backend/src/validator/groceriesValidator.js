import Joi from "joi";

export const createGroceryValidator = Joi.object({
  recipeId: Joi.string().min(2).required(),
});

export const updateGroceryValidator = Joi.object({
  recipeId: Joi.string().optional(),
});
