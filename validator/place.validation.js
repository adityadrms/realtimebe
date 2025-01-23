const Joi = require('joi');


const placeValidation = Joi.object({
  name: Joi.string().max(100).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 100 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  address: Joi.string().max(400).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 400 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  latitude: Joi.number().required().messages({
    'number.base': '"{#label}" harus berupa angka.'
  }),
  longitude: Joi.number().required().messages({
    'number.base': '"{#label}" harus berupa angka.'
  })
});


const updatePlaceValidation = Joi.object({
  companyId: Joi.string().max(50).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 50 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  id: Joi.string().max(50).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 50 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  name: Joi.string().max(100).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 100 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  address: Joi.string().max(400).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 400 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  latitude: Joi.number().required().messages({
    'number.base': '"{#label}" harus berupa angka.'
  }),
  longitude: Joi.number().required().messages({
    'number.base': '"{#label}" harus berupa angka.'
  })
});

const deletePlaceValidation = Joi.object({
  companyId: Joi.string().max(50).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 50 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  }),
  id: Joi.string().max(50).required().messages({
    'string.base': '"{#label}" harus berupa teks.',
    'string.max': '"{#label}" tidak boleh lebih dari 50 karakter.',
    'any.required': '"{#label}" wajib diisi.'
  })
});

module.exports = {
  placeValidation,
  updatePlaceValidation,
  deletePlaceValidation,
};
