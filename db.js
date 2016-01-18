var pgp = require('pg-promise')();

module.exports = pgp({
  database: 'stalker',
  user: 'postgres',
  password: 'james'
});