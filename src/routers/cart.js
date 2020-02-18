const express = require("express");

const Router = express.Router();
const cartController = require("../controllers/cart");
const cartDetailController = require("../controllers/cart_detail");

Router
.get("/", cartController.getCart)
.get("/:id_cart", cartController.cartDetail)
.get("/:id_cart/pay", cartController.cartPay)
.post("/", cartController.insertCart)
.post("/:id_cart", cartDetailController.insertCartDetail)

module.exports = Router;
