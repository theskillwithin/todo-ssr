'use strict';
const {validate: _validate, ValidationError} = require('../modules/validation');

const validate = schema => {
  return async (request, response, next) => {
    try {
      const coercions = await _validate(request.body, schema);
      request.invalidations = [];
      request.body = coercions;  // TODO :: use `Object.assign()` ?
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        request.invalidations = error.invalidations;
        next();
      } else {
        next(error);
      }
    }
  };
};

module.exports = validate;
