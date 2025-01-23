const Joi = require("joi");

const employeeValidation = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.base": "Name harus berupa string.",
    "string.max": "Name tidak boleh lebih dari 100 karakter.",
    "any.required": "Name wajib diisi.",
  }),
  email: Joi.string().max(100).required(),
  role: Joi.string().valid("ADMIN", "USER").required().messages({
    "string.base": "Role harus berupa string.",
    "any.required": "Role wajib diisi.",
    "any.only": "Role hanya dapat bernilai 'ADMIN' atau 'USER'.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .message(
      '"{#label}" harus terdiri dari setidaknya 6 karakter dengan minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol'
    )
    .required(),
});

const loginEmployeeValidation = Joi.object({
  email: Joi.string().max(100).email().required().messages({
    "string.base": "Email harus berupa string.",
    "string.max": "Email tidak boleh lebih dari 100 karakter.",
    "string.email": "Email harus dalam format yang valid.",
    "any.required": "Email wajib diisi.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password harus berupa string.",
    "string.min": "Password harus memiliki setidaknya 6 karakter.",
    "any.required": "Password wajib diisi.",
  }),
});
const updateEmployeeValidation = Joi.object({
  id: Joi.string().max(50).required(),
  name: Joi.string().max(100),
  email: Joi.string().max(100),
  role: Joi.string().valid("ADMIN", "USER").required().messages({
    "string.base": "Role harus berupa string.",
    "any.required": "Role wajib diisi.",
    "any.only": "Role hanya dapat bernilai 'ADMIN' atau 'USER'.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .message(
      '"{#label}" harus terdiri dari setidaknya 6 karakter dengan minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol'
    ),
  companyId: Joi.string().max(50).required().messages({
    "string.base": "Company ID harus berupa string.",
    "string.max": "Company ID tidak boleh lebih dari 50 karakter.",
    "any.required": "Company ID wajib diisi.",
  }),
});

const deleteEmployeeValidation = Joi.object({
  id: Joi.string().max(50).required(),
});

module.exports = {
  employeeValidation,
  loginEmployeeValidation,
  updateEmployeeValidation,
  deleteEmployeeValidation,
};
