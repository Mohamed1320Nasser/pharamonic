const joi = require("joi");
exports.MangerSchema = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'any.required': 'Name is required.',
          'string.empty': 'Name cannot be empty.',
          'string.min': 'Name should have a minimum length of {#limit}.',
          'string.max': 'Name should have a maximum length of {#limit}.',
        }),
      email: joi.string().email().messages({
        'string.email': 'Invalid email format.',
        "string.required": "user email field is required",
        "string.empty": "empty user email is not acceptable",
        'any.required': 'Name is required.',
      }),
      Id: joi.string()
        .pattern(/^Mr.{6}$/)
        .required()
        .messages({
          'any.required': 'ID is required.',
          'string.empty': 'ID cannot be empty.',
          'string.pattern.base': 'ID must start with "Mr" and be 8 characters long.',
        }),
      phone: joi.number().required().messages({
        'any.required': 'Phone is required.',
        'number.base': 'Phone must be a number.',
      }),
    })
};
exports.UpadteMangerSchema = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string()
        .min(3)
        .max(30)
        .messages({
          'any.required': 'Name is required.',
          'string.empty': 'Name cannot be empty.',
          'string.min': 'Name should have a minimum length of {#limit}.',
          'string.max': 'Name should have a maximum length of {#limit}.',
        }),
      email: joi.string().email().messages({
        'string.email': 'Invalid email format.',
        "string.required": "user email field is required",
        "string.empty": "empty user email is not acceptable",
        'any.required': 'Name is required.',
      }),
      phone: joi.number().messages({
        'any.required': 'Phone is required.',
        'number.base': 'Phone must be a number.',
      }),
    })
};