const connection = require('../configs/db');

module.exports = {
  getTodaysIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT sum(total_price_cart) as TodaysIncome FROM cart WHERE created_at = CURDATE() and checkout = 1', (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  yesterdayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(total_price_cart) as yesterdayIncome FROM cart WHERE created_at BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE() - INTERVAL 1 SECOND",
        (err, result_yesterdayIncome) => {
          if (!err) {
            resolve(result_yesterdayIncome);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getTotalCartWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT count(*) as Orders FROM cart WHERE YEARWEEK(created_at) = YEARWEEK(curdate() + INTERVAL 1 DAY) and checkout = 1`, (err, result) => {
      if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getTotalCartLastWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orderlastWeek FROM cart WHERE created_at >= curdate() - INTERVAL DAYOFWEEK(curdate())+5 DAY AND created_at < curdate() - INTERVAL DAYOFWEEK(curdate())-2 DAY",
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
  getYearsIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT sum(total_price_cart) as YearsIncome FROM cart WHERE created_at <= CURDATE() and created_at >= CURDATE() - INTERVAL 1 YEAR and checkout = 1`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getLastYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(total_price_cart) as lastYearIncome FROM cart WHERE YEAR(created_at) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))",
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