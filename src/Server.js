const express = require("express");
const cors = require("cors");

const { db } = require("./database/db");
const { userRouter } = require("./routes/user.router");
const { petRouter } = require("./routes/pet.router");
const { authRouter } = require("./routes/auth.router");
const { configureDatabase } = require("./models/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Path Routes
    this.paths = {
      pets: "/api/v1/pets",
      users: "/api/v1/users",
      auth: "/api/v1/auth"
    };

    // Connect to db
    this.database();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.pets, petRouter);
    this.app.use(this.paths.auth, authRouter);
  }

  database() {
    db.authenticate()
      .then(() => {
        console.log("Database authenticated");
        configureDatabase();
      })
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on the port", this.port);
    });
  }
}

module.exports = Server;
