const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");
const { Users } = require("../models/users.model");

dotenv.config({ path: "./conf.env" });

exports.protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(AppError("EL TOKEN no es valido", 403, res));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findOne({
    where: { id: decoded.id, status: "active" }
  });

  if (!user) {
    return next(AppError("El propietario de la sesión no esta activo", 440, res));
  }

  req.sessionUser = user;
  next();
});

exports.protectAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role === "client") {
    return next(AppError("Este perfil no cuenta con el acceso necesario", 403, res));
  }
  next();
});
