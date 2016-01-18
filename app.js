// Main dependencies.
var express = require('express')
  , passport = require('passport')
  , swig = require('swig')
  , jwt = require('jsonwebtoken')
  , cors = require('cors')
  , config = require('./config/config')();

// Create express instance.
app = express();

// Enable CORS on ALL routes. Probably a bad idea but OK for proof of concept.
app.use(cors());


// Static content folder
// -- Added BEFORE any session middleware so sessions aren't served for static resources.
app.use(express.static(__dirname + '/public'));

// Core middleware.
app.use(require('body-parser').json());
app.use(require('express-session')(config.session));


// View engine.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// Routes.
require('./routes/comments')(app);
require('./routes/sources')(app);
require('./routes/leads')(app);
require('./routes/auth')(app);


// Error handling middleware(s).
app.use(function (err, req, res, next) {
  var messages;

  if(err.name) {
    if(err.name === 'SequelizeValidationError') {
      messages = err.errors.map(function (e) {
        return 'invalid value provided for property ' + e.path;
      });
    }

    return res.status(400).send(messages);
  }

  if(err.status) {
    return res.status(err.status).send(err.error);
  }

  next(err);
})

module.exports = app;