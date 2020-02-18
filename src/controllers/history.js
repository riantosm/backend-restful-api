const historyModel = require('../models/history');
const miscHelperHis = require("../helpers/history");

module.exports = {
  getHistorys: (req, res) => {
    historyModel.getTodaysIncome()
    .then(result_today => {
      historyModel.getTotalCartWeek()
      .then(result_week => {
        historyModel.getYearsIncome()
        .then(result_year => {
          historyModel.yesterdayIncome()
          .then(result_todays => {
            historyModel.getTotalCartLastWeek()
            .then(result_weeks => {
              historyModel.getLastYearIncome()
              .then(result_years => {
                miscHelperHis.response(res, result_today, result_week, result_year, result_todays, result_weeks, result_years, 200);
              }).catch(err => console.log(err));
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  },
  getTodaysIncome: (req, res) => {
    historyModel.getTodaysIncome()
    .then(result_today => {
      res.json(result_today);
    }).catch(err => console.log(err));
  },
  yesterdayIncome: (req, res) => {
    historyModel.yesterdayIncome()
    .then(result_todays => {
      res.json(result_todays);
    }).catch(err => console.log(err));
  },
  getTotalOrderWeek: (req, res) => {
    historyModel.getTotalOrderWeek()
    .then(result_week => {
        res.json(result_week);
    }).catch(err => console.log(err));
  },
  getTotalCartLastWeek: (req, res) => {
    historyModel.getTotalCartLastWeek()
    .then(result_weeks => {
        res.json(result_weeks);
    }).catch(err => console.log(err));
  },
  getYearsIncome: (req, res) => {
    historyModel.getYearsIncome()
    .then(result_year => {
        res.json(result_year);
    }).catch(err => console.log(err));
  },
  getLastYearIncome: (req, res) => {
    historyModel.getLastYearIncome()
    .then(result_year => {
        res.json(result_year);
    }).catch(err => console.log(err));
  }
};