const joi = require("joi");
exports.diagnosisSchema = {
  body: joi
    .object()
    .required()
    .keys({
        Id: joi.string()
        .pattern(/^Pt.{6}$/)
        .required()
        .messages({
            'any.required': 'ID is required.',
            'string.empty': 'ID cannot be empty.',
            'string.pattern.base': 'ID must start with "Nr" and be 8 characters long.',
        }),
        diagnosis: joi.string()
        .required()
        .min(3)
        .max(1000)
        .messages({
          'any.required': 'Diagnosis are required.',
          'string.empty': 'Diagnosis cannot be empty.',
          'string.min': 'Diagnosis should have a minimum length of {#limit}.',
          'string.max': 'Diagnosis should have a maximum length of {#limit}.',
        }),
        prescription: 
        joi.string()
        .required()
        .min(3)
        .max(1000)
        .messages({
          'any.required': 'Prescription is required.',
          'string.empty': 'Prescription cannot be empty.',
          'string.min': 'Prescription should have a minimum length of {#limit}.',
          'string.max': 'Prescription should have a maximum length of {#limit}.',
        }),
    })
};

exports.updateDiagnosisSchema = {
  body: joi
    .object()
    .required()
    .keys({

        diagnosis: joi.string()
        .min(3)
        .max(1000)
        .messages({
          'string.empty': 'Diagnosis cannot be empty.',
          'string.min': 'Diagnosis should have a minimum length of {#limit}.',
          'string.max': 'Diagnosis should have a maximum length of {#limit}.',
        }),
        prescription: 
        joi.string()
        .min(3)
        .max(1000)
        .messages({
          'string.empty': 'Prescription cannot be empty.',
          'string.min': 'Prescription should have a minimum length of {#limit}.',
          'string.max': 'Prescription should have a maximum length of {#limit}.',
        }),
    })
};