const Joi = require('joi');
const { ResponseError } = require('../error/response.error.js');

const validate = async (schema, request) => {
  try {
    const result = await schema.validateAsync(request, {
      abortEarly: false,
      allowUnknown: false,  
    });

    return result; 

  } catch (error) {
    if (error.isJoi) {
      const errors = error.details.map(err => err.message);
      throw new ResponseError(400, errors.join(', '));
    }
    throw error;
  }
};

module.exports = {
  validate ,
};
