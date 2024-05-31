import Joi from "joi";

export const registerUserValidator = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().min(8).max(100).required(),
  gender: Joi.boolean().required(),
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(8).max(100)
});


export const patchUserValidator = Joi.object({
  username: Joi.string().max(100).required(),
  address_id: Joi.string().max(50).optional(),
  class_id: Joi.string().max(50).optional()
});