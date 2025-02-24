const { Router } = require("express");

//CONTROLLERS
const {
  createUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  getUser
} = require("../controllers/user.controller");

//MIDDLEWARES
const { userValidators, passwordValidators } = require("../middlewares/validators.middlewares");

const { validExistEmail, validExistUserById } = require("../middlewares/user.middleware");

const { protectSession, protectAdmin } = require("../middlewares/auth.middlewares");

const router = Router();

router.patch("/:email", validExistEmail, passwordValidators, updatePassword);

router.use(protectSession);

router.post("/create", protectAdmin, userValidators, createUser);

router.get("/", protectAdmin, getAllUsers);

router.get("/:id", protectAdmin, getUser);

router.delete("/:id", protectAdmin, validExistUserById, deleteUser);

module.exports = {
  userRouter: router
};
