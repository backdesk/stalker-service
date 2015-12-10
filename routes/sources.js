var service = require('../services/sources');

module.exports = function (app, passport) {
  app.get('/sources', function (req, res, next) {
    service.find(req.query, function (err, data) {
      res.json(data);
    });
  });

  app.get('/sources/:id', function (req, res, next) {
    service.get(req.params.id, function (err, data) {
      if(!err) {
        res.json(data);
      } else {
        next(err);
      }
    });
  });

  app.post('/sources', function (req, res, next) {
    service.create(req.body, function (err, data) {
      if(!err) {
        res.status(201).json(data);
      } else {
        next(err);
      }
    });
  });

  app.put('/sources/:id', function (req, res, next) {
    service.update(req.params.id, req.body, function (err, data) {
      if(!err) {
        res.json(data);
      } else {
        next(err);
      }
    });
  });

  app.delete('/sources/:id', function (req, res, next) {
    service.remove(req.params.id, function (err) {
      if(!err) {
        res.sendStatus(204);
      } else {
        next(err);
      }
    });
  });
}