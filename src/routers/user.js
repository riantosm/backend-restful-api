const express = require("express");

const Router = express.Router();
const userController = require("../controllers/user");
const loginController = require("../controllers/login");
const auth = require("../helpers/auth");

Router
  .get("/", userController.getUser)
  .get("/:id_user", userController.detailUser)
  .post("/", userController.insertUser)
  .patch("/:id_user", userController.updateUser)
  .delete("/:id_user", userController.deleteUser)

module.exports = Router;
