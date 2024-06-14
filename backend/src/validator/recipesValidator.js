import Joi from "joi";

export const createRecipesValidator = Joi.object({
  name: Joi.string().required(),
  descriptions: Joi.string().required(),
  cuisine: Joi.string().required(),
  instructions: Joi.string().required(),
  recipePicture: Joi.optional(),
  categoryId: Joi.string().required(),
  videoId: Joi.string().required()
});

export const updateRecipesValidator = Joi.object({
  descriptions: Joi.string().optional(),
  cuisine: Joi.string().optional(),
  instructions: Joi.string().optional(),
  recipePicture: Joi.optional(),
  categoryId: Joi.string().optional(),
  videoId: Joi.string().optional()
});