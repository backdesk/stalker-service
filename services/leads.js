var mongoose = require('mongoose')
  , _ = require('lodash')
  , Lead = mongoose.model('Lead');

var ObjectId = mongoose.Types.ObjectId;


module.exports = {
  get : function (id, cb) {
    Lead.findById(id)
      .populate('source', '_id weight type name company')
      .slice('activity', 0, 5)
      .exec(function (err, lead) {
        if (err) return cb(err, null);

        if (!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead);
      });
  },

  find : function (params, cb) {
    var query = {};

    if (params) {
      if (params.status) {
        query.status = params.status;
      }
    }

    Lead.find(query, 'details weight updatedAt source status channel')
      .populate('source', '_id type name company')
      .exec(function (err, leads) {
        if (err) return cb(err, null);

        return cb(null, {
          leads : leads,
          total : leads.length
        });
      });
  },

  remove : function (id, cb) {
    Lead.findByIdAndRemove(id, function (err) {
      if (err) return cb(err, null);

      return cb();
    });
  },

  create : function (body, cb) {
    var lead = new Lead(body);

    lead.createdAt = Date.now();
    lead.updateDAt = lead.createdAt;

    lead.save(function (err, lead) {
      if (err) return cb(err);

      Lead.populate(lead, 'source', function (err, lead) {
        return cb(null, lead);
      });
    })
  },

  dismiss : function (id, cb) {
    Lead.findById(id)
      .then(function (lead) {
        if(!lead.activity) lead.activity = [];

        lead.status = 'junk';
        lead.updatedAt = Date.now();

        lead.activity.unshift({
          createdAt : lead.updatedAt,
          op : 'system',
          comment : 'Lead was dismissed and set to "junk"'
        });

        return lead.save();
      })
      .then(function () {
        return cb();
      }, cb);
  },

  getActivity : function (id, params, cb) {
    var limit = 5, skip = parseInt(params.skip, 10);

    skip = _.isNaN(skip) ? 0 : skip;

    Lead.findById(id)
      .slice('activity', [skip, limit])
      .exec(function (err, lead) {

        if (err) return cb(err, null);

        if (!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead.activity || []);
      });
  },

  logActivity : function (id, body, cb) {
    Lead.findById(id)
      .then(function (lead) {
        if(!lead.activity) lead.activity = [];

        body.createdAt = lead.updatedAt = Date.now();

        lead.activityCount++;
        lead.activity.unshift(body);

        return lead.save();
      })
      .then(function (lead) {
        return cb(null, _.first(lead.activity));
      }, cb);
  },

  update : function (id, body, cb) {
    body.updatedAt = Date.now();

    body = _.omit(body, 'activity');

    Lead.findByIdAndUpdate(id, { $set: body }, { runValidators: true, 'new' : true })
      .populate('source')
      .exec(function (err, lead) {
        if (err) return cb(err);

        if (!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead);
      });
  }
};
