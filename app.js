// Main dependencies.
var express = require('express')
  , passport = require('passport')
  , swig = require('swig')
  , mongoose = require('mongoose')
  , config = require('./config')();

// Create express instance.
app = express();


// Static content folder
// -- Added BEFORE session middleware so sessions aren't served for static resources.
app.use(express.static(__dirname + '/public'));


// Mongoose
mongoose.connect('mongodb://' + config.db.uri);


// Core middleware.
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.session));


// View engine.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// Passport.
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {
    id : 1,
    username : 'crung'
  });
});

passport.use(new LocalStrategy(function (username, password, done) {
  return done(null, {
    id : 1,
    username : 'crung'
  });
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes.
var auth = require('./routes/auth')(app, passport);

app.get('/', function (req, res) {
  res.send('ping! pong!');
});


module.exports = app;