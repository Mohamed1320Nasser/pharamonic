const joi = require("joi");
exports.userSchema = { body: joi
.object()
.required()
.keys({
  name: joi.string().required().min(3).max(50).messages({
    "any.required": "userName field is required",
    "any.empty": "empty userName is not acceptable",
  }),
  email: joi.string().email().required().messages({
    "any.required": "user email field is required",
    "any.empty": "empty user email is not acceptable",
  }),
  password: joi.string().required().regex(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)).messages({
    "any.required": "user password field is required",
    "any.empty": "empty user password is not acceptable",
  }),
  repassword: joi.ref("password"),
  phone: joi.number().required().messages({
    "any.required": "user phone field is required",
    "any.empty": "empty user phone is not acceptable",
  }),
})};

exports.loginSchema = { body: joi
  .object()
  .required()
  .keys({
    email: joi.string().email().required().messages({
      "any.required": "user email field is required",
      "any.empty": "empty user name is not acceptable",
    }),
    password: joi.string().required().regex(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)).messages({
      "any.required": "user password field is required",
      "any.empty": "empty user name is not acceptable",
    }),
  })};

  exports.changePassSchema = { body: joi
    .object()
    .required()
    .keys({
      oldPassword: joi.string().required().messages({
        "any.required": " old Password field is required",
        "any.empty": "empty  old Password is not acceptable",
      }),
      newPassword: joi.string().required().regex(RegExp(RegExp(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/))).messages({
        "any.required": "user new Password field is required",
        "any.empty": "empty user new Password is not acceptable",
      }),
    })};