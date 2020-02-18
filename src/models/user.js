const connection = require('../configs/db');

module.exports = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  detailUser: username => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE username = ?',
        username,
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
  detailUserToken: token => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE token = ?',
        token,
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
  detailUserId: id_user => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE id_user = ?', id_user,
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
  insertUser: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?, id_user_level = 2", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateUser: (id_user, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id_user = ?",
        [data, id_user],
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
  deleteUser: id_user => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM users WHERE id_user = ?",
        id_user,
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
  updateToken: (id_user, token) =>{
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET token = ? WHERE id_user = ?",
        [token, id_user],
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