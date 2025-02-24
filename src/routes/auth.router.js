const { Router } = require("express");

//CONTROLLERS
const { register, login } = require("../controllers/auth.controller");

//MIDDLEWARES
const {
  userValidators,
  loginValidators,
  passwordValidators
} = require("../middlewares/validators.middlewares");

const router = Router();

router.post("/login", loginValidators, login);

router.post("/register", userValidators, passwordValidators, register);

module.exports = {
  authRouter: router
};
