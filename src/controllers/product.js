const productModel = require('../models/product');
const miscHelper = require("../helpers/helpers");
const errHelper = require("../helpers/new_helpers");
const jwt = require('jsonwebtoken');

module.exports = {
  getProduct: (req, res) => {
    productModel.getProduct()
    .then(result => {
      miscHelper.response(res, result, 200);
    }).catch(err => console.log(err));
  },
  productSearch: (req, res) => {
    const name_product = req.params.name_product;
    productModel.productSearch(name_product)
    .then(result => {
      miscHelper.response(res, result, 200);
    }).catch(err => console.log(err));
  },
  productDetail: (req, res) => {
    const id_product = req.params.id_product;
    productModel.productDetail(id_product)
    .then(result => {
      if(result==0){
        errHelper.response(res, "Invalid!", "Not found", 201);
      }else{
        miscHelper.response(res, result, 200);
      }
    }).catch(err => console.log(err));
  },
  insertProduct: (req, res) => {

    var token = req.headers.token
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const { name_product, desc_product, price_product, id_category } = req.body;
    let imagee;
    let data = {};
    // console.log(req.file.filename);
    if(req.file == undefined){
      imagee = '';
      data = {
        name_product,
        desc_product,
        price_product,
        image: imagee,
        id_user: decoded.id,
        id_category
      };
    }else{
      data = {
        name_product,
        desc_product,
        price_product,
        image: `http://localhost:3001/uploads/${req.file.filename}`,
        id_user: decoded.id,
        id_category
      };
    }
    productModel.insertProduct(data)
    .then(result => {
      miscHelper.response(res, result, 201);
    }).catch(err => console.log(err));
  },
  updateProduct: (req, res) => {

    var token = req.headers.token
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const id_product = req.params.id_product;
    const { name_product, desc_product, price_product, id_category } = req.body;
    let imagee;
    let data = {};
    productModel.productDetail(id_product)
    .then(result => {
      // console.log()
      if(req.file == undefined){
        imagee = '';
        data = {
          name_product,
          desc_product,
          price_product,
          image: result[0].image,
          id_user: decoded.id,
          id_category
        }
      }else{
        image_delete = result[0].image;
        data = {
          name_product,
          desc_product,
          price_product,
          image: `http://localhost:3001/uploads/${req.file.filename}`,
          id_user: decoded.id,
          id_category
        }
        // remove file{
        const fs = require('fs');
        const path = image_delete.replace('http://localhost:3001', '.');
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return
          }
          //file removed
        })
        // }
      }
      productModel.updateProduct(id_product, data, result[0].image)
      .then(result => {
        productModel.productDetail(id_product)
        .then(result => {
          if(result==0){
            errHelper.response(res, "Invalid!", "Not found", 201);
          }else{
            res.json(result);
          }
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  },
  addStockProduct: (req, res) => {
    const id_product = req.params.id_product;
    const { stock } = req.body;
    const status = 'add';
    const data = { stock_product: stock };
    productModel.addStockProduct(id_product, data, status)
    .then(result => {
      productModel.productDetail(id_product)
      .then(result => {
        if(result==0){
          errHelper.response(res, "Invalid!", "Not found", 201);
        }else{
          res.json(result);
        }
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  },
  deleteProduct: (req, res) => {
    const id_product = req.params.id_product;
    productModel.productDetail(id_product)
    .then(result => {
      // 
      productModel.deleteProduct(id_product, result[0].image)
      .then(result => {
        res.json(result);
      }).catch(err => console.log(err));
      // 
    }).catch(err => console.log(err));
  },
  productSort: (req, res) => {
    const field = req.params.field;
    const sc = req.params.sc;
    productModel.productSort(field, sc)
    .then(result => {
      res.json(result);
    }).catch(err => console.log(err));
  },
  productPagination: (req, res) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    let nextpage = page+1;
    let prepage = page-1;
    
    productModel.productPagination(page,limit)
    .then(result_page => {
      productModel.getProduct()
      .then(result_data => {
        res.json({
          total_data: result_data.length,
          limit,
          page:parseInt(page),
          total_page: result_page.length,
          result_page,
          next:`http://localhost:3000/api/v1/product/pagination/${page+1}-${limit}`,
          pre:`http://localhost:3000/api/v1/product/pagination/${page-1}-${limit}`
        });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
};