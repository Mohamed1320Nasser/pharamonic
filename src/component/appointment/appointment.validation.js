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
            patient: joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required()
                .messages({
                    "string.pattern.base": "Patient ID must be a valid ObjectId.",
                    "any.required": "Patient is required.",
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