var mongoose = require('mongoose')
  , _ = require('lodash')
  , moment = require('moment')
  , Source = mongoose.model('Source');

var ObjectId = mongoose.Types.ObjectId;

var ABYSS_THRESHOLD = 604800 * 2;

module.exports = {
  getThresholdQuery : function (mode) {
    var threshold = moment().subtract(ABYSS_THRESHOLD, 's');

    if(mode === 'below') {
      return  { $lte : threshold.toDate() }
    }

    return  { $gte : threshold.toDate() }
  },

  get : function (id, cb) {
    if (ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Source.findById(id)
      .exec(function (err, source) {
        if (err) return cb(err, null);

        if (!source) {
          return cb({ status : 404 });
        }

        return cb(null, source);
      });
  },

  find : function (params, cb) {
    var query = {};

    params = params || {};

    if(params.name) {
      _.extend(query, {
        name : new RegExp('^' + _.escapeRegExp(params.name) + '.*')
      });
    }

    if(params.status) {
      _.extend(query, {
        status : params.status
      });
    }

    if(params.threshold) {
      _.extend(query, {
        lastContactAt : this.getThresholdQuery(params.threshold)
      });
    }

    Source.find(query)
      .exec(function (err, sources) {
        if (err) return cb(err, null);

        return cb(null, {
          sources : sources,
          total : sources.length
        });
      });
  },

  remove : function (id, cb) {
    cb({ status : 501 });
  },

  create : function (body, cb) {
    var source = new Source(body);

    source.createdAt = Date.now();
    source.save(function (err, lead) {
      if (err) return cb(err);

      return cb(null, source);
    })
  },

  condition : function (id, condition, cb) {
    var query;

    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    if (condition === 'tickles') {
      query = { $inc : { tickles : 1 }}
    } else {
      query = { $inc : { scratches : 1 }}
    }

    Source.findByIdAndUpdate(id, query)
      .exec(function (err, source) {
        if(err) return cb(err);

        if(!source) {
          return cb({ status : 404 });
        }

        return cb();
      });
  },

  update : function (id, body, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Source.findByIdAndUpdate(id, { $set: body }, { runValidators: true, 'new' : true })
      .exec(function (err, source) {
        if (err) return cb(err);

        if (!source) {
          return cb({ status : 404 });
        }

        return cb(null, source);
      });
  }
};