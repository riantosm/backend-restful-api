const cartDetailModel = require('../models/cart_detail');
const cartModel = require('../models/cart');
const miscHelper = require("../helpers/helpers");
const miscHelper3 = require("../helpers/cart_detail");
const errHelper = require("../helpers/new_helpers");

module.exports = {
  cartDetailCart: (req, res) => {
    const id_cart = req.params.id_cart;
    cartDetailModel.cartDetailCart(id_cart)
    .then(result => {
      miscHelper.response(res, result, 201);
    }).catch(err => res.json({ msg: 'Invalid!' }));
  },
  insertCartDetail: (req, res) => {
    const id_cart = req.params.id_cart;
    // mengambil price product
    cartDetailModel.productDetail(req.body.id_product)
    .then(result => {
      const { id_product, qty } = req.body;
      if(qty <= result[0].stock_product){
        const data = {
          id_cart: id_cart,
          id_product,
          qty,
          total_price: result[0].price_product * qty
        };
        if(data.qty>0){
          const last_stock = result[0].stock_product - qty;
          const price = data.total_price;
          cartDetailModel.findPriceCart(id_cart)
          .then(resultt => {
            let totalPriceCart = resultt[0].total_price_cart + price;
            let ppn = totalPriceCart * 0.10;
            cartDetailModel.insertCartDetail(data)
            .then(result => {
              const data = { total_price_cart: totalPriceCart, ppn: ppn };
              cartDetailModel.updateCartTotal(id_cart, data)
              .then(result => {
                const data = {
                  stock_product: last_stock
                };
                cartDetailModel.updateProduct(id_product, data)
                .then(result => {
                  // 
                  cartModel.cartDetail(id_cart)
                  .then(result_1 => {
                    cartDetailModel.cartDetailCart(id_cart)
                    .then(result_2 => {
                      miscHelper3.response(res, result_1, result_2, 201);
                    }).catch(err => errHelper.response(res, "Invalid!", "ID not found", 201));
                  }).catch(err => console.log(err));
                  // 
                }).catch(err => console.log(err));
              }).catch(err => console.log(err));
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }else{
          errHelper.response(res, "Invalid!", "QTY must be > 0", 201);
        }
      }else{
        errHelper.response(res, "Invalid!", "Stock not enough", 201);
      }
    }).catch(err => errHelper.response(res, "Error!", "Input invalid", 201));
  }
};