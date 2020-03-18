const cartModel = require('../models/cart');
const cartDetailModel = require('../models/cart_detail');
const miscHelper = require('../helpers/helpers');
const miscHelper3 = require('../helpers/cart_detail');
const errHelper = require('../helpers/new_helpers');
const jwt = require('jsonwebtoken');

module.exports = {
  getCart: (req, res) => {
    cartModel
      .getCart()
      .then(result => {
        miscHelper.response(res, result, 200);
      })
      .catch(err => console.log(err));
  },
  cartDetail: (req, res) => {
    if (req.params.id_cart == 'payed') {
      cartModel
        .cartDetailPay(1)
        .then(result_1 => {
          for (let index = 0; index < result_1.length; index++) {
            res.json({ result_1 });
          }
        })
        .catch(err => console.log(err));
    } else {
      const id_cart = req.params.id_cart;
      cartModel
        .cartDetail(id_cart)
        .then(result_1 => {
          const id_cart = req.params.id_cart;
          cartDetailModel
            .cartDetailCart(id_cart)
            .then(result_2 => {
              miscHelper3.response(res, result_1, result_2, 201);
            })
            .catch(err =>
              errHelper.response(res, 'Invalid!', 'ID not found', 201)
            );
        })
        .catch(err => console.log(err));
    }
  },
  cartPay: (req, res) => {
    const id_cart = req.params.id_cart;
    cartModel
      .cartPay(id_cart)
      .then(result => {
        res.json({ result });
      })
      .catch(err => console.log(err));
  },
  insertCart: (req, res) => {
    var token = req.headers.token;
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const { name_customer } = req.body;
    const data = {
      name_customer,
      total_price_cart: 0,
      ppn: 0,
      id_user: decoded.id
    };
    cartModel
      .insertCart(data)
      .then(result => {
        cartModel
          .cartDetail(result.insertId)
          .then(result_1 => {
            miscHelper.response(res, result_1, 201);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
