var jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const miscHelper = require("../helpers/helpers");
const bcrypt = require('bcryptjs');

module.exports = {
  loginUser: (req, res) => {
    res.json({
      msg: 'already logged in',
      user_id: process.env.USER_ID,
      token: process.env.TOKENS
    })
  },
  getUser: (req, res) => {
    const { username, password } = req.body;
    userModel.detailUser(username)
    .then(result => {
      bcrypt.compare(password, result[0].password, function(err, ress) {
        // res === true
          // console.log(password,' ', result[0].password)
        if(ress){
          const data = { username, password }
          var token = jwt.sign({ id:result[0].id_user, name:result[0].name_user }, process.env.PRIVATE_KEY);
          userModel.updateToken(result[0].id_user,token)
          .then(results => {
            res.json({
              token: token
            })
          }).catch(err => res.json({msg: 'incorrect username / password1'}));
        }else{
          res.json({msg: 'incorrect username / password2'})
        }
      });
    }).catch(err => res.json({msg: 'incorrect username / password3'}));
  },
  logout: (req, res) => {
    token = req.headers.token
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    userModel.updateToken(decoded.id,'0')
    .then(results => {
      res.json({
        msg: 'Logout success'
      })
    }).catch(err => res.json({msg: 'incorrect username / password'}));
  }
};