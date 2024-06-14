import Joi from "joi";

export const createIngredientValidator = Joi.object({
  name: Joi.string().min(2).required(),
  unit: Joi.string().min(2).required(),
  quantity: Joi.number().required()
});

export const updateIngredientValidator = Joi.object({
  name: Joi.string().min(2).required(),
  unit: Joi.string().min(2).required(),
  quantity: Joi.number().optional()
});
