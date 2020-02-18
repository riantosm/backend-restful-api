const connection = require('../configs/db');

module.exports = {
  getCart: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT cart.*, users.name_user FROM cart INNER JOIN users ON cart.id_user = users.id_user ORDER BY id_cart DESC`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  cartDetail: id_cart => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT cart.*, users.name_user FROM cart INNER JOIN users ON cart.id_user = users.id_user WHERE id_cart = ? ORDER BY id_cart DESC',
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
  cartDetailPay: checkout => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cart ',
        checkout,
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
  insertCart: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO cart SET ?, created_at = NOW( ), checkout = 1", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  cartPay: (id_cart) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cart SET checkout = 1 WHERE id_cart = ?",
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
  }
};