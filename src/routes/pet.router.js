const { Router } = require("express");
const { createPet, getAllPets } = require("../controllers/pet.controller");
const { petValidators } = require("../middlewares/pet.validators.midedlewares");
const { protectSession, protectAdmin } = require("../middlewares/auth.middlewares");
const { validExistUserById } = require("../middlewares/user.middleware");

const router = Router();

router.use(protectSession, protectAdmin);

router.post("/:id", validExistUserById, petValidators, createPet);

router.get("/", getAllPets);

module.exports = {
  petRouter: router
};
