var _ = require('lodash')
  , express = require('express')
  , db = require('../models')
  , v1 = express.Router();

module.exports = function (app, passport) {
  v1.get('/comments/:type/:id', function (req, res, next) {
    var params = {
      where : {
        object_id : req.params.id,
        object_type : req.params.type
      }
    };

    db.comment.findAndCountAll(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        return next(e);
      });
  });

  v1.post('/comments/', function (req, res, next) {
    var types = ['lead'], type = req.body.object_type;

    if(!type || types.indexOf(type) === -1) {
      return next({ status: 400, error: { message : 'Invalid content type' } });
    }

    db.comment.create(req.body)
      .then(function (comment) {
        res.status(201).json(comment);
      })
      .catch(function (e) {
        return next(e);
      });
  });

  app.use('/api/v1', v1);
  app.use('/', v1);
}