var mongoose = require('mongoose')
  , _ = require('lodash')
  , Activity = mongoose.model('Activity')
  , Lead = mongoose.model('Lead');

var ObjectId = mongoose.Types.ObjectId;


module.exports = {
  get : function (id, cb) {
    if (ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Lead.findById(id)
      .populate({ path : 'activity',  options : { limit: 5, sort : '-createdAt' } })
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

    Lead.find(query, 'details updatedAt source status channel')
      .exec(function (err, leads) {
        if (err) return cb(err, null);

        return cb(null, {
          leads : leads,
          total : leads.length
        });
      });
  },

  remove : function (id, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

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

      return cb(null, lead);
    })
  },

  dismiss : function (id, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Lead.findByIdAndUpdate(id, { $set: { status : 'junk' } })
      .exec(function (err, lead) {
        if (err) return cb(err);

        if (!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead);
      });
  },

  getActivity : function (id, params, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    var options = _.pick(params, 'skip');

    Activity.find({ lead : id }, null, options)
      .sort( '-createdAt')
      .limit(5)
      .exec(function (err, activity) {
        if (err) return cb(err);

        cb(null, activity);
      })
  },

  logActivity : function (id, body, cb) {
    var activity;

    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Lead.count({ _id : id })
      .then(function (count) {
        if (count === 0)  cb({ status : 404 });

        activity = new Activity(_.extend(body, {
          lead : id,
          createdAt : Date.now()
        }));

        return activity.save();
      })
      .then(function (activity) {
        return Lead.findByIdAndUpdate(id, {
          $addToSet : { 'activity': activity.id },
          $inc : {'activityCount' : 1 },
          $set : {'updatedAt' : Date.now() }
        }).exec();
      })
      .then(function () {
        cb(null, activity);
      }, cb);
  },

  update : function (id, body, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    body.updatedAt = Date.now();

    Lead.findByIdAndUpdate(id, { $set: body }, { runValidators: true, 'new' : true })
      .exec(function (err, lead) {
        if (err) return cb(err);

        if (!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead);
      });
  }
};
