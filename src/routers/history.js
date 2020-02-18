const express = require("express");

const Router = express.Router();
const historyController = require("../controllers/history");

Router
  .get("/", historyController.getHistorys)
  .get("/today", historyController.getTodaysIncome)
  .get("/week", historyController.getTotalOrderWeek)
  .get("/year", historyController.getYearsIncome)

module.exports = Router;