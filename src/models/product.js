const connection = require('../configs/db');

module.exports = {
  getProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product.*, category.name_category as name_category FROM product INNER JOIN category ON product.id_category = category.id_category WHERE deleted = 0', (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  productSearch: name_product => {
    return new Promise((resolve, reject) => {
      if(name_product=='0'){
        connection.query('SELECT product.*, category.name_category as name_category FROM product INNER JOIN category ON product.id_category = category.id_category WHERE deleted = 0 and stock_product > 0', (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      }else{
        connection.query(
          `SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id_category WHERE product.name_product like '%${name_product}%' and deleted = 0 and stock_product > 0`,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      }
    });
  },
  productDetail: id_product => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT product.*, category.name_category, users.name_user FROM product INNER JOIN category ON product.id_category = category.id_category INNER JOIN users ON product.id_user = users.id_user WHERE product.id_product = ? and deleted = 0',
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
  insertProduct: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO product SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateProduct: (id_product, data, image_delete) => {
    return new Promise((resolve, reject) => {
      // console.log(data.image);
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
  },
  addStockProduct: (id_product, data, status) => {
    return new Promise((resolve, reject) => {
      let operator;
      if(status=='add'){
        operator = '+';
      }else{
        operator = '-';
      }
      connection.query(
        `UPDATE product SET stock_product = stock_product ${operator} ? WHERE id_product = ?`,
        [data.stock_product, id_product],
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
  deleteProduct: (id_product, image_delete) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET deleted = 1 WHERE id_product = ?",
        id_product,
        (err, result) => {
          if (!err) {
            resolve(result);
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
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  productSort: (field, sc) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE deleted = 0 ORDER BY ${field} ${sc}`,
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
  productPagination: (pages, limit) => {
    return new Promise((resolve, reject) => {
      let many = limit;
      let page = pages;
      let start = (page>1) ? (page * many) - many : 0;
      connection.query(
        `SELECT * FROM product WHERE deleted = 0 LIMIT ${start}, ${many}`,
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