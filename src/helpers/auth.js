const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = {
  verify: (req, res, next) => {
    try {
      token = req.headers.token
      var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
      console.log(decoded)
      next()
    } catch (err) {
      // err
      console.log(err)
      res.json({
        msg: 'Token invalid'
      })
    }
  },
  verify_admin: (req, res, next) => {
    try {
      token = req.headers.token
      var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
      userModel.detailUserId(decoded.id)
      .then(result => {
        if(decoded.id == 1){
          next()
        }else{
          res.json({
            msg: 'Please login as ADMIN .. '
          })
        }
      }).catch(err => res.json({msg: 'Error'}));
    } catch (err) {
      // err
      console.log(err)
      res.json({
        msg: 'Token invalid'
      })
    }
  }
}