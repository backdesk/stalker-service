var _ = require('lodash')
  , express = require('express')
  , db = require('../models')
  , v1 = express.Router();

module.exports = function (app) {
  v1.get('/sources/:id', function (req, res, next) {
    db.source.findById(req.params.id)
      .then(function (source) {
        var data;

        if(!source) return next({ status: 404 });

        data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.json(_.omit(data, 'updated_at'));
      })
      .catch(function (e) {
        return next(e);
      });
  });

  v1.get('/sources', function (req, res, next) {
    var where = {}, params = _.pick(req.query, 'offset', 'name', 'status', 'limit');

    if(params.status) {
      where.status = params.status;
    }

    if(params.name) {
      where.name = { $iLike : params.name + '%' }
    }

    _.extend(params, {
      where : where
    });

    db.source.findAndCountAll(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        return next(e);
      });
  });

  v1.post('/sources', function (req, res, next) {
    db.source.create(req.body)
      .then(function (source) {
        var data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.status(201).json(_.omit(data, 'updated_at'));
      })
      .catch (function (e) {
        next(e);
      });
  });

  v1.put('/sources/:id', function (req, res, next) {
    db.source.findById(req.params.id)
      .then(function (source) {
        if(!source) return next({ status: 404 });

        return source.update(req.body);
      })
      .then(function (source) {
        var data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.json(_.omit(data, 'updated_at'));
      })
      .catch (function (e) {
        next(e);
      });
  });

  v1.delete('/sources/:id', function (req, res, next) {
    db.source.findById(req.params.id)
      .then(function (source) {
        if(!source) return next({ status: 404 });

        return source.destroy();
      })
      .then(function (source) {
        res.status(204).send();
      })
      .catch (function (e) {
        next(e);
      })
  });

  app.use('/v1', v1);
  app.use('/', v1);
}