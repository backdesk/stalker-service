var fs        = require('fs')
  , path      = require('path')
  , config    = require('../config/config')()
  , Sequelize = require('sequelize');

var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, { 
  dialect : 'postgres', 
  host : config.db.host
});

var db = {};

[
  'user',
  'source',
  'lead',
  'comment',
  'feed'
].forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
