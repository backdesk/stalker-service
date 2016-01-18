var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
//var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};


var sequelize = new Sequelize('stalker', 'postgres', 'james', { dialect : 'postgres', host : 'localhost'});

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