module.exports = {
  response: (res, result_status, result_detail, status, err) => {
    let resultPrint = {};
    // resultPrint.status_code = status;
    resultPrint.status = result_status;
    resultPrint.result = result_detail;
    // resultPrint.err = err || null;
    return res.status(status).json(resultPrint);
  }
};
