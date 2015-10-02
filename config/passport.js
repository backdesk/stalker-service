var bcrypt = require('bcrypt');


var LocalStrategy = require('passport-local');

module.exports = function (passport) {
    var service = require('../services/user');

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      service.get(id, function (err, user) {
        if (err) return done(err);
        done(null, user);
      })
    });

    passport.use(new LocalStrategy(function (username, done) {
      password = bcrypt.hashSync(password, 10);

      service.getByCredentials(username, function (err, user) {
        if (err) return done(err);

        if(user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }

        return done(null, false);
      });
    }));
}