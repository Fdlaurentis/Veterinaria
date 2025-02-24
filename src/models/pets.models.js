const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

exports.Pets = db.define("pets", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBrith: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sexo: {
    type: DataTypes.ENUM("macho", "hembra"),
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sterilized: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
