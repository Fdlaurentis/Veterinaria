const { body, checkValidations, check } = require("../utils/validation.util");

exports.userValidators = [
  body("firstName")
    .isString()
    .withMessage("El nombre debe ser una cadena")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({ min: 3 })
    .withMessage("Debe tener como minimo 3 caracteres"),
  body("lastName")
    .isString()
    .withMessage("El apellido debe ser una cadena")
    .notEmpty()
    .withMessage("El apellido no debe estar vacio")
    .isLength({ min: 3 })
    .withMessage("Debe tener como minimo 3 caracteres"),
  body("email")
    .isEmail()
    .withMessage("Ingrese un correo valido")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio"),
  body("dni")
    .notEmpty()
    .withMessage("El DNI no debe estar vacio")
    .isNumeric()
    .withMessage("El DNI debe ser una numerico")
    .isLength({ min: 10 })
    .withMessage("El DNI debe tener como minimo 10 caracteres"),
  check("role")
    .isIn(["admin", "doctor", "client"])
    .withMessage('El rol es invalido deben ser "admin", "doctor", "client"'),
  checkValidations
];

exports.loginValidators = [
  body("email")
    .isEmail()
    .withMessage("Ingrese un correo valido")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacio")
    .isString()
    .withMessage("La contraseña debe ser una cadena")
    .isLength({ min: 8 })
    .withMessage("Debe tener como minimo 8 caracteres"),
  checkValidations
];

exports.passwordValidators = [
  body("password")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacio")
    .isString()
    .withMessage("La contraseña debe ser una cadena")
    .isLength({ min: 8 })
    .withMessage("Debe tener como minimo 8 caracteres"),
  checkValidations
];
