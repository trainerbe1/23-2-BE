import Joi from "joi";

export const registerUserValidator = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().min(8).max(100).required(),
  gender: Joi.boolean().required(),
  role: Joi.string().optional()
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(8).max(100)
});


export const patchUserValidator = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  gender: Joi.boolean().required(),
  password: Joi.string().min(8).required()
});

export const putUserChangePasswordValidator = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required()
});

export const putUserChangeEmailValidator = Joi.object({
  oldEmail: Joi.string().email().required(),
  newEmail: Joi.string().email().required()
});