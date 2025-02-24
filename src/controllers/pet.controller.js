const { Pets } = require("../models/pets.models");
const { Users } = require("../models/users.model");
const { AppError } = require("../utils/appError.util");

const { catchAsync } = require("../utils/catchAsync.util");

//Create Pet
exports.createPet = catchAsync(async (req, res, next) => {
  const { name, dateOfBrith, sexo, species, sterilized, userId } = req.body;

  const checkPet = await Pets.findOne({ where: { name } });

  if (checkPet) {
    return next(AppError("La mascota ya éxiste", 409, res));
  }

  const newPet = await Pets.create({
    name,
    dateOfBrith,
    sexo,
    species,
    sterilized,
    userId
  });

  res.status(200).json({
    status: "success",
    response: "Mascota creada con éxito",
    data: { newPet }
  });
});

//Get All Pets
exports.getAllPets = catchAsync(async (req, res) => {
  const pets = await Pets.findAll({
    include: [{ model: Users, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }]
  });

  res.status(200).json({
    status: "success",
    data: { pets }
  });
});
