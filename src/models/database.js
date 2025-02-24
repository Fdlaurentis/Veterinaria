const { db } = require("../database/db");
const { Pets } = require("./pets.models");
const { Users } = require("./users.model");

const configureDatabase = () => {
  //relations
  //1 Users : M pets
  Users.hasMany(Pets, { foreignKey: "userId" });
  Pets.belongsTo(Users);

  //Sync hacia BBDD
  db.sync()
    .then(() => console.log("Database Synced"))
    .catch(error => console.log(error));
};

module.exports = {
  configureDatabase
};
