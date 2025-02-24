const { body, validationResult, check } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);

    const message = errorMessages.join(". ");

    return next(AppError(message, 400, res));
  }

  next();
};

module.exports = { body, checkValidations, check };
