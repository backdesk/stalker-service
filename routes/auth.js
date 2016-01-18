var _ = require('lodash')
  , express = require('express')
  , jwt = require('jsonwebtoken')
  , db = require('../models')
  , v1 = express.Router();

module.exports = function (app, passport) {
  v1.post('/auth', function (req, res, next) {
    var username = req.body.username, password = req.body.password;

    if(!username || ! password) {
      return next({ status : 400, message : 'Please provide a username and password' });
    }

    db.user.find({ where : { username : username, password : password } })
      .then(function (user) {
        if(!user) return next({ status: 404 });

        res.json({
          token: jwt.sign(user.get(), process.env.JWT_KEY)
        });
      })
      .catch(function (e) {
        return next(e);
      });
  });

  app.use('/v1', v1);
  app.use('/', v1);
}