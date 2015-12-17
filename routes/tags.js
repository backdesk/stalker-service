var service = require('../services/tags');

module.exports = function (app, passport) {
  app.get('/tags', function (req, res, next) {
    service.find(req.query, function (err, data) {
      res.json(data);
    });
  });

  app.post('/tags', function (req, res, next) {
    service.create(req.body, function (err, data) {
      res.json(data);
    });
  });

  app.put('/tags', function (req, res, next) {

  });

  app.delete('/tags', function (req, res, next) {

  });
}