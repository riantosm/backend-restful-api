const connection = require('../configs/db');

module.exports = {
  cartDetailCart: id_cart => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT product.name_product, cart_detail.qty, cart_detail.total_price FROM cart_detail INNER JOIN product ON cart_detail.id_product = product.id_product WHERE id_cart = ?',
        id_cart,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  productDetail: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE id_product = ?',
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insertCartDetail: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO cart_detail SET ?, created_at = NOW( )", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateCartTotal: (id_cart, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cart SET ? WHERE id_cart = ?",
        [data, id_cart],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  findPriceCart: id_cart => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT total_price_cart FROM cart WHERE id_cart = ?',
        id_cart,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updateProduct: (id_product, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET ? WHERE id_product = ?",
        [data, id_product],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};