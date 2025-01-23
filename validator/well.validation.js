const Joi = require("joi");

const wellValidation = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  address: Joi.string().max(400).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 400 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  latitude: Joi.number().required().messages({
    "number.base": '"{#label}" harus berupa angka.',
  }),
  longitude: Joi.number().required().messages({
    "number.base": '"{#label}" harus berupa angka.',
  }),
  topic: Joi.string().max(100).optional().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "string.pattern.base":
      '"{#label}" hanya boleh mengandung huruf, angka, dan underscore.',
  }),
  rig: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  apiKey: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
});

const updateWellValidation = Joi.object({
  id: Joi.string().max(50).required().messages({
    "string.base": "ID harus berupa string.",
    "string.max": "ID tidak boleh lebih dari 50 karakter.",
    "any.required": "ID wajib diisi.",
  }),
  placeId: Joi.string().max(50).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 50 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  name: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  address: Joi.string().max(400).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 400 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  latitude: Joi.number().required().messages({
    "number.base": '"{#label}" harus berupa angka.',
  }),
  longitude: Joi.number().required().messages({
    "number.base": '"{#label}" harus berupa angka.',
  }),
  topic: Joi.string().max(100).optional().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "string.pattern.base":
      '"{#label}" hanya boleh mengandung huruf, angka, dan underscore.',
  }),
  rig: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  apiKey: Joi.string().max(100).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 100 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
});

const deleteWellValidation = Joi.object({
  placeId: Joi.string().max(50).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 50 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
  id: Joi.string().max(50).required().messages({
    "string.base": '"{#label}" harus berupa teks.',
    "string.max": '"{#label}" tidak boleh lebih dari 50 karakter.',
    "any.required": '"{#label}" wajib diisi.',
  }),
});

module.exports = {
  wellValidation,
  updateWellValidation,
  deleteWellValidation,
};
