const joi = require("joi");
exports.appointmentSchema = {
    body: joi
        .object()
        .required()
        .keys({
            medications: joi.array()
                .items(
                    joi.object({
                        medication: joi.string().required().messages({
                            "any.required": "Medication is required.",
                        }),
                        dose: joi.string().required().messages({
                            "any.required": "Dose is required.",
                        }),
                    })
                )
                .required()
                .messages({
                    "any.required": "Medications are required.",
                }),
               Id: joi.string()
                .pattern(/^Pt.{6}$/)
                .required()
                .messages({
                    'any.required': 'ID is required.',
                    'string.empty': 'ID cannot be empty.',
                    'string.pattern.base': 'ID must start with "Nr" and be 8 characters long.',
                }),
            schedule: joi.number().required().messages({
                "any.required": "Schedule is required.",
            }),
            createdAt: joi.date().default(new Date()),
        })
};

exports.addNots= {
    body: joi
        .object()
        .required()
        .keys({

            doctorNotes: joi.string()
                .min(3)
                .max(1000)
                .messages({
                    'string.empty': 'Diagnosis cannot be empty.',
                    'string.min': 'Diagnosis should have a minimum length of {#limit}.',
                    'string.max': 'Diagnosis should have a maximum length of {#limit}.',
                }),
        })
};