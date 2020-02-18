const userModel = require('../models/user');
const miscHelper = require("../helpers/helpers");
const bcrypt = require('bcryptjs');

module.exports = {
  getUser: (req, res) => {
    userModel.getUser()
    .then(result => {
      miscHelper.response(res, result, 200);
    }).catch(err => console.log(err));
  },
  detailUser: (req, res) => {
    const id_user = req.params.id_user;
    userModel.detailUserId(id_user)
    .then(result => {
      res.json(result);
    }).catch(err => console.log(err));
  },
  insertUser: (req, res) => {
    const { name_user, username, password } = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
          // console.log(hash);
          const data = { name_user, username, password: hash };
          userModel.insertUser(data)
          .then(result => {
            userModel.getUser()
            .then(result => {
              miscHelper.response(res, result, 200);
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        });
    });

  },
  updateUser: (req, res) => {
    const id_user = req.params.id_user;
    const { username, password } = req.body;
    const data = { username, password };
    userModel.updateUser(id_user, data)
    .then(result => {
      res.json(result);
    }).catch(err => console.log(err));
  },
  deleteUser: (req, res) => {
    const id_user = req.params.id_user;
    userModel.deleteUser(id_user)
    .then(result => {
      res.json(result);
    }).catch(err => console.log(err));
  }
};