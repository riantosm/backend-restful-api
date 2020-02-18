const express = require("express");

const Router = express.Router();
const loginController = require("../controllers/login");
const auth = require("../helpers/auth");

Router
.get("/", auth.verify, loginController.logout)

module.exports = Router;
