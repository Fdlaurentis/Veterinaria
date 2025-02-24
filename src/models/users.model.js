const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

exports.Users = db.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM("admin", "doctor", "client"),
    allowNull: false,
    defaultValue: "client"
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: "00000000000"
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "n/a"
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "n/a"
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active"
  }
});
