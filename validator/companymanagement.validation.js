const Joi = require('joi');

const companySchema = Joi.object({
  name: Joi.string().max(100).required(),
  address: Joi.string().max(500).optional(),
});

const employeeSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  role: Joi.string().valid('USER', 'ADMIN').default('USER'),
  password: Joi.string().min(8).max(255).required(),
  companyId: Joi.string().optional(),
});

const placeSchema = Joi.object({
  name: Joi.string().max(255).required(),
  address: Joi.string().max(500).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  companyId: Joi.string().required(),
});

const wellSchema = Joi.object({
  name: Joi.string().max(100).required(),
  address: Joi.string().max(500).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  placeId: Joi.string().required(),
});

// Gabungkan semua skema menjadi satu skema
const createDataSchema = Joi.object({
  company: companySchema.required(),
  employee: employeeSchema.required(),
  place: placeSchema.required(),
  well: wellSchema.required(),
});

module.exports = {
  createDataSchema,
};