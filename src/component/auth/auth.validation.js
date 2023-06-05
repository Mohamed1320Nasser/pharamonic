const joi = require('joi');

exports.loginSchema = {
  body: joi
    .object()
    .required()
    .keys({
      Id: joi.string()
        .required()
        .messages({
          'any.required': 'ID is required.',
          'string.empty': 'ID cannot be empty.',
        }),
      password: joi.string()
        .required()
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)
        .messages({
          'any.required': 'Password is required.',
          'string.empty': 'Password cannot be empty.',
          'string.pattern.base': 'Password must contain at least one letter, one digit, and be at least 8 characters long.',
        }),
      fcmToken: joi.string().messages({
        'string.empty': 'fcmToken cannot be empty.',
      })
    })
};

exports.changePassSchema = {
  body: joi
    .object()
    .required()
    .keys({
      oldPassword: joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/).required().messages({
        'any.required': 'Password is required.',
        'string.empty': 'Password cannot be empty.',
        'string.pattern.base': 'Password must contain at least one letter, one digit, and be at least 8 characters long.',
      }),
      newPassword: joi.string()
        .required()
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)
        .messages({
          'any.required': 'Password is required.',
          'string.empty': 'Password cannot be empty.',
          'string.pattern.base': 'Password must contain at least one letter, one digit, and be at least 8 characters long.',
        }),
      repassword: joi.string().valid(joi.ref('newPassword'))
    })
};
