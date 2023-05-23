const joi = require("joi");
exports.DoctorSchema = {
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
      specialty: joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'any.required': 'Specialty is required.',
          'string.empty': 'Specialty cannot be empty.',
          'string.min': 'Specialty should have a minimum length of {#limit}.',
          'string.max': 'Specialty should have a maximum length of {#limit}.',
        }),
      email: joi.string().email().messages({
        'string.email': 'Invalid email format.',
        "string.required": "user email field is required",
        "string.empty": "empty user email is not acceptable",
      }),
      Id: joi.string()
        .pattern(/^Dr.{6}$/)
        .required()
        .messages({
          'any.required': 'ID is required.',
          'string.empty': 'ID cannot be empty.',
          'string.pattern.base': 'ID must start with "Dr" and be 8 characters long.',
        }),
      phone: joi.number().required().messages({
        'any.required': 'Phone is required.',
        'number.base': 'Phone must be a number.',
      }),
    })
};
exports.UpdateDoctorSchema = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string()
        .min(3)
        .max(30)
        .messages({
          'string.empty': 'Name cannot be empty.',
          'string.min': 'Name should have a minimum length of {#limit}.',
          'string.max': 'Name should have a maximum length of {#limit}.',
        }),
      specialty: joi.string()
        .min(3)
        .max(30)
        .messages({
          'string.empty': 'Specialty cannot be empty.',
          'string.min': 'Specialty should have a minimum length of {#limit}.',
          'string.max': 'Specialty should have a maximum length of {#limit}.',
        }),
      email: joi.string().email().messages({
        'string.email': 'Invalid email format.',
        "string.empty": "empty user email is not acceptable",
      }),
  
      phone: joi.number().messages({
        'number.base': 'Phone must be a number.',
      }),
    })
};


