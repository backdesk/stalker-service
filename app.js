// Main dependencies.
var express = require('express')
  , passport = require('passport')
  , swig = require('swig')
  , cors = require('cors')
  , mongoose = require('mongoose')
  , config = require('./config/config')();

// Create express instance.
app = express();

// Enable CORS on all routes. Probably a bad idea but OK for proof of concept.
app.use(cors());

// Static content folder
// -- Added BEFORE session middleware so sessions aren't served for static resources.
app.use(express.static(__dirname + '/public'));


// Mongoose connection. Need to read up on pooling.
mongoose.connect('mongodb://' + config.db.uri);

require('./services/models/user');
require('./services/models/source');
require('./services/models/activity');
require('./services/models/lead');

// Core middleware.
app.use(require('body-parser').json());
app.use(require('express-session')(config.session));


// View engine.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// Passport.
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


// Routes.
var auth = require('./routes/auth')(app, passport);
var leads = require('./routes/leads')(app);
var sources = require('./routes/sources')(app);

app.get('/', function (req, res) {
  res.send('ping! pong!');
});


// Error handling middleware(s).
app.use((function (err, req, res, next) {
  if(err.name && err.name == 'ValidationError') {
    console.log(err);
    res.status(400).send();
  } else {
    next();
  }
}))

app.use(function (err, req, res, next) {
  res.status(err.status).send();
});

module.exports = app;