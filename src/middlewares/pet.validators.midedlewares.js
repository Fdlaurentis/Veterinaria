const { checkValidations, body } = require("../utils/validation.util");

exports.petValidators = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser una cadena")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({ min: 3 })
    .withMessage("Debe tener como minimo 3 caracteres"),
  body("dateOfBrith")
    .isString()
    .withMessage("La fecha de nacimiento debe tener el siguiente formato AÑO-MES-DÍA")
    .notEmpty()
    .withMessage("La fecha de nacimiento no debe estar vacio"),
  body("sexo")
    .notEmpty()
    .withMessage("El sexo no debe estar vacio")
    .isIn(["macho", "hembra"])
    .withMessage('El rol es invalido deben ser "macho", "hembra"'),
  body("species")
    .isString()
    .withMessage("La especie debe ser una cadena")
    .notEmpty()
    .withMessage("La especie no debe estar vacio")
    .isLength({ min: 3 })
    .withMessage("Debe tener como minimo 3 caracteres"),
  body("sterilized")
    .isString()
    .withMessage("El campo esterelizado debe ser una cadena")
    .notEmpty()
    .withMessage("El campo esterelizado no debe estar vacio"),
  body("userId").isNumeric().notEmpty().withMessage("El ID del duelo no puede estar vacio"),
  checkValidations
];
