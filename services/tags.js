var mongoose = require('mongoose')
  , _ = require('lodash');

var Tag = mongoose.model('Tag');

module.exports = {
  find : function (params, cb) {
    var query = {};

    params = params || {};

    if(params.name) {
      _.extend(query, {
        name : new RegExp('^' + _.escapeRegExp(params.name) + '.*', 'i')
      });
    }

    Tag.find(query)
      .exec(function (err, tags) {
        if (err) return cb(err, null);

        return cb(null, tags);
      });
  },

  create : function (body, cb) {
    var tag = new Tag(body);

    tag.save(function (err, tag) {
      if (err) return cb(err);

      return cb(null, tag);
    })
  },

  update : function (id, body, cb) {

  },

  remove : function (id) {

  }
}