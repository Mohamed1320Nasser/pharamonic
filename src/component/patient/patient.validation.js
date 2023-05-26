const joi = require("joi");
exports.PatientSchema = {
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
            dateOfBirth: joi.date().required().messages({
                'any.required': 'Date of birth is required.',
                'date.base': 'Date of birth must be a valid date.',
            }),
            email: joi.string().email().messages({
                'string.email': 'Invalid email format.',
                "string.required": "user email field is required",
                "string.empty": "empty user email is not acceptable",
            }),
            Id: joi.string()
                .pattern(/^Pt.{6}$/)
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
            sex: joi.string().valid('male', 'female').required().messages({
                'string.base': 'Sex must be a string',
                'any.required': 'Sex is required',
                'any.only': 'Sex must be either male or female'
            }),
            medicalHistory: joi.string().required().messages({
                'any.required': 'MedicalHistory is required.',
                'string.empty': 'MedicalHistory cannot be empty.',
            }),
            lastVisited: joi.date().required().messages({
                'any.required': 'lastVisited is required.',
                'date.base': 'lastVisited must be a valid date.',
            })
        }
        )
}
exports.UpadtePatientSchema = {
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
            address: joi.string()
                .min(5)
                .max(100)
                .messages({
                    'string.empty': 'Address cannot be empty.',
                    'string.min': 'Address should have a minimum length of {#limit}.',
                    'string.max': 'Address should have a maximum length of {#limit}.',
                }),
            dateOfBirth: joi.date().messages({
                'any.required': 'Date of birth is required.',
                'date.base': 'Date of birth must be a valid date.',
            }),
            email: joi.string().email().messages({
                'string.email': 'Invalid email format.',
                "string.empty": "empty user email is not acceptable",
            }),
            phone: joi.number().messages({
                'number.base': 'Phone must be a number.',
            }),
            sex: joi.string().valid('male', 'female').messages({
                'string.base': 'Sex must be a string',
                'any.only': 'Sex must be either "male" or "female"'
            }),
            medicalHistory: joi.string().messages({
                'string.empty': 'MedicalHistory cannot be empty.',
            }),
            lastVisited: joi.date().messages({
                'date.base': 'lastVisited must be a valid date.',
            })
        }
        )
}