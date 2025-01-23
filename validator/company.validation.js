const Joi = require("joi");

const companyValidation = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name harus berupa string.",
    "string.max": "Name tidak boleh lebih dari 100 karakter.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address harus berupa string.",
    "string.max": "Address tidak boleh lebih dari 400 karakter.",
  }),
});

const updateCompanyValidation = Joi.object({
  id: Joi.string().max(50).required().messages({
    "string.base": "ID harus berupa string.",
    "string.max": "ID tidak boleh lebih dari 50 karakter.",
    "any.required": "ID wajib diisi.",
  }),
  name: Joi.string().max(100).optional().messages({
    "string.base": "Name harus berupa string.",
    "string.max": "Name tidak boleh lebih dari 100 karakter.",
  }),
  address: Joi.string().max(400).optional().messages({
    "string.base": "Address harus berupa string.",
    "string.max": "Address tidak boleh lebih dari 400 karakter.",
  }),
});

const deleteCompanyValidation = Joi.object({
  id: Joi.string().max(50).required().messages({
    "string.base": "ID harus berupa string.",
    "string.max": "ID tidak boleh lebih dari 50 karakter.",
    "any.required": "ID wajib diisi.",
  }),
});

module.exports = {
  companyValidation,
  updateCompanyValidation,
  deleteCompanyValidation,
};
