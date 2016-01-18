var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function(err, user) {
      if (err) return next({ status : 401 });

      return next();
    });
  } else {
    return next({ status : 401 });
  }
};