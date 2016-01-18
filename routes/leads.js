var _ = require('lodash')
  , express = require('express')
  , db = require('../models')
  , v1 = express.Router();

var verify = require('../verify');

module.exports = function (app) {
  v1.get('/leads/:id', function (req, res, next) {
    db.lead.findById(req.params.id, { include: [db.source] })
      .then(function (lead) {
        var data;

        if(!lead) return next({ status: 404 });

        data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.json(_.omit(data, 'updated_at'));
      })
      .catch(function (e) {
        return next(e);
      });
  });

  v1.get('/leads', function (req, res, next) {
    var where = {}, params = _.pick(req.query, 'offset', 'status', 'limit');

    if(params.status) {
      where.status = params.status;
    }

    _.extend(params, {
      include: [ { model: db.source, attributes: ['id', 'name', 'type'] } ],
      where : where
    });

    db.lead.findAndCountAll(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        return next(e);
      });
  });

  v1.post('/leads', function (req, res, next) {
    db.lead.create(req.body)
      .then(function (lead) {
        var data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.status(201).json(_.omit(data, 'updated_at'));
      })
      .catch(function (e) {
        return next(e);
      });
  });


  v1.put('/leads/:id', function (req, res, next) {
    db.lead.findById(req.params.id, { include: [db.source] })
      .then(function (lead) {
        if(!lead) return next({ status: 404 });

        return lead.update(req.body);
      })
      .then(function (lead) {
        var data = lead.toJSON();

        res.set('Last-Modified', data.updated_at);
        res.json(_.omit(data, 'updated_at'));
      })
      .catch (function (e) {
        next(e);
      });
  });

  v1.delete('/leads/:id', function (req, res, next) {
    db.lead.findById(req.params.id)
      .then(function (lead) {
        if(!lead) return next({ status: 404 });

        return lead.destroy();
      })
      .then(function (lead) {
        res.status(204).send();
      })
      .catch (function (e) {
        next(e);
      })
  });

  app.use('/v1', v1);
  app.use('/', v1);
}