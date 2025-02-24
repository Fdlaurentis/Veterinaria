const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { catchAsync } = require("../utils/catchAsync.util");

const { AppError } = require("../utils/appError.util");

const { Users } = require("../models/users.model");

const { notifyRegister } = require("../utils/mailSender");

dotenv.config({ path: "./config.env" });

// Create Usuario
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, dni, email, role, phone, address, avatar, password } = req.body;

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  const checkEmail = await Users.findOne({ where: { email } });

  const checkDni = await Users.findOne({ where: { dni } });

  if (checkEmail) {
    return next(AppError("Email éxiste", 409, res));
  } else if (checkDni) {
    return next(AppError("DNI éxiste", 409, res));
  }

  const newUser = await Users.create({
    firstName,
    lastName,
    email,
    dni,
    password: hashedPassword,
    role,
    phone,
    address,
    avatar
  });

  newUser.password = undefined;

  notifyRegister(email, firstName, lastName, password);

  res.status(201).json({
    status: "success",
    data: { newUser }
  });
});

//Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { email, status: "active" }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(AppError("Las credenciales son incorrectas", 401, res));
  }

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    status: "success",
    data: { user, token }
  });
});
