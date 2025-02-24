"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: ".conf.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// async..await is not allowed in global scope, must use a wrapper
exports.notifyRegister = async function (email, firstName, lastName, password) {
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: '"Pet System 🐶" <petsystem04@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Registro exitoso", // Subject line
      text: `Hello ${firstName} ${lastName}`, // plain text body
      html: `Hola ${firstName} ${lastName} tu registro fue éxito te comparto tus credenciales <b><br>email: ${email} <br>contraseña: ${password}</b>` // html body
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico enviado: " + info.response);
      }
    }
  );
};
