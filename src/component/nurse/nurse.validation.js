const joi = require("joi");
exports.NurseSchema = {
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
        address: joi.string()
        .min(5)
        .max(100)
        .required()
        .messages({
          'any.required': 'Address is required.',
          'string.empty': 'Address cannot be empty.',
          'string.min': 'Address should have a minimum length of {#limit}.',
          'string.max': 'Address should have a maximum length of {#limit}.',
        }),
        department: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'any.required': 'Department is required.',
          'string.empty': 'Department cannot be empty.',
          'string.min': 'Department should have a minimum length of {#limit}.',
          'string.max': 'Department should have a maximum length of {#limit}.',
        }),
      email: joi.string().email().messages({
        'string.email': 'Invalid email format.',
        "string.required": "user email field is required",
        "string.empty": "empty user email is not acceptable",
      }),
      Id: joi.string()
        .pattern(/^Nr.{6}$/)
        .required()
        .messages({
          'any.required': 'ID is required.',
          'string.empty': 'ID cannot be empty.',
          'string.pattern.base': 'ID must start with "Nr" and be 8 characters long.',
        }),
      phone: joi.number().required().messages({
        'any.required': 'Phone is required.',
        'number.base': 'Phone must be a number.',
      }),
    })
};