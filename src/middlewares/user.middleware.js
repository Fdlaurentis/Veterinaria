const { Users } = require("../models/users.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

exports.validExistUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({
    where: {
      id,
      status: "active"
    }
  });

  if (!user) {
    return next(AppError(`El usuario con ID ${id} no éxiste`, 404, res));
  }

  req.user = user;
  next();
});

exports.validExistEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await Users.findOne({
    where: {
      email,
      status: "active"
    }
  });

  if (!user) {
    return next(AppError(`El correo ${email} no existe`, 403, res));
  }

  req.user = user;

  next();
});
