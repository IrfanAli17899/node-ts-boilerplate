const joi = require('joi');
const { ApiError } = require('../helpers');

const anySchema = joi.any();

const getMessage = (err) => err.details?.[0]?.type === 'any.custom'
  ? err.details[0].context.error.message
  : err.message;

const reqQueryValidator = (schema = anySchema) => (req, res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.query);

  if (validationError) {
    next(new ApiError(400, `Invalid request query: ${getMessage(validationError)}`));
    return;
  }

  req.query = validValue;
  next();
};

const reqBodyValidator = (schema = anySchema) => (req, res, next) => {
  const {
    error: validationError,
    value: validValue,
  } = schema.validate(req.body);

  if (validationError) {
    next(new ApiError(400, `Invalid request body: ${getMessage(validationError)}`));
    return;
  }

  req.body = validValue;
  next();
};


module.exports = {
  reqQueryValidator,
  reqBodyValidator,
};
