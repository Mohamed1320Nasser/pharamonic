const joi = require("joi");
exports.MedicationSchema = {
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
        activeIngredients: joi.array()
        .items(joi.string())
        .required()
        .min(1)
        .messages({
          'any.required': 'Active ingredients are required.',
          'array.min': 'At least one active ingredient is required.'
        }),
      doses: joi.array()
        .items(joi.string())
        .required()
        .min(1)
        .messages({
          'any.required': 'Doses are required.',
          'string.empty': 'Doses cannot be empty.',
          'array.min': 'At least one dose is required.'
        }),
      warnings: joi.string().required().min(3).max(1000).messages({
        'any.required': 'warnings is required.',
        'string.empty': 'warnings cannot be empty.',
        'string.min': 'warnings should have a minimum length of {#limit}.',
        'string.max': 'warnings should have a maximum length of {#limit}.',
      }),
      sideEffects: joi.string().required().min(3).max(1000) .messages({
        'any.required': 'sideEffects is required.',
        'string.empty': 'sideEffects cannot be empty.',
        'string.min': 'sideEffects should have a minimum length of {#limit}.',
        'string.max': 'sideEffects should have a maximum length of {#limit}.',
      }),
    })
};
exports.UpdateMedicationSchema = {
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
        activeIngredients: joi.array()
        .items(joi.string())
        .min(1)
        .messages({
          'array.min': 'At least one active ingredient is required.'
        }),
      doses: joi.array()
        .items(joi.string())
        .min(1)
        .messages({
          'string.empty': 'Doses cannot be empty.',
          'array.min': 'At least one dose is required.'
        }),
      warnings: joi.string().min(3).max(1000).messages({
        'string.empty': 'warnings cannot be empty.',
        'string.min': 'warnings should have a minimum length of {#limit}.',
        'string.max': 'warnings should have a maximum length of {#limit}.',
      }),
      sideEffects: joi.string().min(3).max(1000) .messages({
        'string.empty': 'sideEffects cannot be empty.',
        'string.min': 'sideEffects should have a minimum length of {#limit}.',
        'string.max': 'sideEffects should have a maximum length of {#limit}.',
      }),
    })
};