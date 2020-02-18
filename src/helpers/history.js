module.exports = {
  response: (res, result1, result2, result3, result4, result5, result6, status, err) => {
    let resultPrint = {};
    resultPrint.TodaysIncome = result1[0].TodaysIncome;
    resultPrint.OrdersWeek = result2[0].Orders;
    resultPrint.YearsIncome = result3[0].YearsIncome;

    resultPrint.TodaysIncomes = result4[0].yesterdayIncome;
    resultPrint.OrdersWeeks = result5[0].orderlastWeek;
    resultPrint.YearsIncomes = result6[0].lastYearIncome;
    return res.status(status).json(resultPrint);
  }
};
