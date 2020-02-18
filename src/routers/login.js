const express = require("express");

const Router = express.Router();
const loginController = require("../controllers/login");
const auth = require("../helpers/auth");

Router
.post("/", loginController.getUser)
.get("/cek_user", auth.verify, loginController.loginUser)

module.exports = Router;
