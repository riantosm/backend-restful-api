module.exports = {
  response: (res, result_1, result_2, status, err) => {
    let resultPrint = {};
    resultPrint.id_cart = result_1[0].id_cart;
    resultPrint.name_customer = result_1[0].name_customer;
    resultPrint.cart = result_2;
    resultPrint.total_price_cart = result_1[0].total_price_cart;
    resultPrint.ppn = result_1[0].ppn;
    resultPrint.name_user = result_1[0].name_user;
    resultPrint.created_at = result_1[0].created_at;
    return res.status(status).json(resultPrint);
  }
};
