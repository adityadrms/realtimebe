const Joi = require("joi");

const conditionValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Nama kondisi tidak boleh kosong.",
    "any.required": "Nama kondisi wajib diisi.",
  }),
});

const updataConditionValidation = Joi.object({
  id: Joi.string().max(50).required().messages({
    "string.base": "ID harus berupa string.",
    "string.max": "ID tidak boleh lebih dari 50 karakter.",
    "any.required": "ID wajib diisi.",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Nama kondisi tidak boleh kosong.",
    "any.required": "Nama kondisi wajib diisi.",
  }),
  rules: Joi.array().items(
    Joi.object({
      id: Joi.string().max(50).required(),
      parameter: Joi.string().required(),
      operator: Joi.string().valid(">", "<", ">=", "<=", "=", "!=").required(),
      thresholdValue: Joi.number().required(),
      logicalOperator: Joi.string().valid("AND", "OR").required(),
    })
  ).optional(),
});

module.exports = {
  conditionValidation,
  updataConditionValidation
};
