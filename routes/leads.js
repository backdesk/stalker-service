var service = require('../services/leads');

module.exports = function (app, passport) {
  app.get('/leads', function (req, res, next) {
    service.find(req.query, function (err, data) {
      res.json(data);
    });
  });

  app.get('/leads/:id', function (req, res, next) {
    service.get(req.params.id, function (err, data) {
      if(!err) {
        res.json(data);
      } else {
        next(err);
      }
    });
  });

  app.post('/leads/:id/activity', function (req, res, next) {
    service.logActivity(req.params.id, req.body, function (err, data) {
      if(!err) {
        res.json(data);
      } else {
        next(err);
      }
    });
  });

  app.post('/leads', function (req, res, next) {
    service.create(req.body, function (err, data) {
      if(!err) {
        res.status(201).json(data);
      } else {
        next(err);
      }
    });
  });

  app.put('/leads/dismiss', function (req, res) {
    service.dismiss(req.body.id, function (err) {
      if(!err) {
        res.status(204).json();
      } else {
        next(err);
      }
    });
  });

  app.put('/leads/:id', function (req, res, next) {
    service.update(req.params.id, req.body, function (err, data) {
      if(!err) {
        res.json(data);
      } else {
        next(err);
      }
    });
  });

  app.delete('/leads/:id', function (req, res, next) {
    service.remove(req.params.id, function (err) {
      if(!err) {
        res.sendStatus(204);
      } else {
        next(err);
      }
    });
  });
}