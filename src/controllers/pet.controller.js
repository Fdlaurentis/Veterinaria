const { Pets } = require("../models/pets.models");

const { catchAsync } = require("../utils/catchAsync.util");

//Create Pet
exports.createPet = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, dateOfBrith, sexo, species, sterilized, userId } = req.body;

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
