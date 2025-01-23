const Joi = require("joi");
const LogicalOperator = {
  AND: 'AND',
  OR: 'OR'
};
const ruleConditionValidation = Joi.object({
  parameter: Joi.string().required().messages({
    "string.empty": "Parameter tidak boleh kosong.",
    "any.required": "Parameter wajib diisi.",
  }),
  operator: Joi.string()
    .required()
    .valid(">", "<", ">=", "<=", "==", "!=")
    .messages({
      "any.only": "Operator harus salah satu dari >, <, >=, <=, ==, !=.",
      "any.required": "Operator wajib diisi.",
    }),
  thresholdValue: Joi.number().required().messages({
    "number.base": "Threshold Value harus berupa angka.",
    "any.required": "Threshold Value wajib diisi.",
  }),
  logicalOperator: Joi.string().valid(LogicalOperator.AND, LogicalOperator.OR).required().messages({
    "any.only": "Logical Operator harus salah satu dari AND, OR.",
    "any.required": "Logical Operator wajib diisi.",
  })
});

const updateRuleConditionValidation = Joi.object({
  id: Joi.string().max(50).required().messages({
    "string.base": "ID harus berupa string.",
    "string.max": "ID tidak boleh lebih dari 50 karakter.",
    "any.required": "ID wajib diisi.",
  }),
  parameter: Joi.string().required().messages({
    "string.empty": "Parameter tidak boleh kosong.",
    "any.required": "Parameter wajib diisi.",
  }),
  operator: Joi.string()
    .required()
    .valid(">", "<", ">=", "<=", "=", "!=")
    .messages({
      "any.only": "Operator harus salah satu dari >, <, >=, <=, =, !=.",
      "any.required": "Operator wajib diisi.",
    }),
  thresholdValue: Joi.number().required().messages({
    "number.base": "Threshold Value harus berupa angka.",
    "any.required": "Threshold Value wajib diisi.",
  }),
  logicalOperator: Joi.string()
    .valid("AND", "OR")
    .required()
    .messages({
      "any.only": "Logical Operator harus salah satu dari AND, OR.",
      "any.required": "Logical Operator wajib diisi.",
    }),
});

module.exports = {
  ruleConditionValidation,
  updateRuleConditionValidation,
};
