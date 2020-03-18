const express = require("express");
const product = require("./product");
const category = require("./category");
const cart = require("./cart");
const user = require("./user");
const history = require("./history");
const login = require("./login");
const logout = require("./logout");
const auth = require('../helpers/auth');

const Router = express.Router();

Router.use("/product", auth.verify, product);
Router.use("/category", auth.verify, category);
Router.use("/cart", auth.verify, cart);
Router.use("/user", auth.verify, user);
Router.use("/history", history);
Router.use("/login", login);
Router.use("/logout", logout);

module.exports = Router;
