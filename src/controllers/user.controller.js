const dotenv = require("dotenv");

const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const { catchAsync } = require("../utils/catchAsync.util");

const { AppError } = require("../utils/appError.util");

const { Users } = require("../models/users.model");
const { Pets } = require("../models/pets.models");
const { notifyRegister } = require("../utils/mailSender");


dotenv.config({ path: "./config.env" });

// Create Usuario
exports.createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, dni, email, role, phone, address, avatar } = req.body;

  const pass = crypto.randomBytes(5).toString("hex");

  const salt = await bcrypt.genSalt(12);

  const password = await bcrypt.hash(pass, salt);

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
    password,
    role,
    phone,
    address,
    avatar
  });

  notifyRegister(email, firstName, lastName, pass);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser }
  });
});

//Update Password
exports.updatePassword = catchAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = req;

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  await user.update({ password: hashedPassword });

  res.status(200).json({
    status: "success",
    response: `La contraseña del email ${user.email} ha sido actualizado con éxito`
  });
});

//Delete User
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: "inactive" });

  res.status(200).json({
    status: "success",
    response: `El usuario con correo ${user.email} fue elimando con éxito`
  });
});

// Get All Users
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt", "status"] },
    where: {
      status: "active",
      role: "client"
    },
    include: [{ model: Pets, attributes: { exclude: ["userId", "createdAt", "updatedAt"] } }]
  });

  res.status(200).json({
    status: "success",
    data: { users }
  });
});
