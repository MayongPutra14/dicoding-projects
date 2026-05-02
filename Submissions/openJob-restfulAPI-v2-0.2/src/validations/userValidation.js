import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').required(),
});

export const authenticationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
