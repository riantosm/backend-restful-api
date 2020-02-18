const express = require("express");
const multer = require("multer");
const auth = require('../helpers/auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const Router = express.Router();
const productController = require("../controllers/product");

Router
  .get("/", productController.getProduct)
  .get("/:id_product", productController.productDetail)
  .post("/", upload.single("image"), productController.insertProduct)
  .patch("/:id_product", upload.single("image"), productController.updateProduct)
  .delete("/:id_product", productController.deleteProduct)
  .patch("/:id_product/stock", productController.addStockProduct)  
  .get("/:name_product/search", productController.productSearch)
  .get("/sort_:sc/:field", productController.productSort)
  .get("/pagination/:page-:limit", productController.productPagination)

module.exports = Router;
