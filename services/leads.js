var mongoose = require('mongoose')
  , Activity = mongoose.model('Activity')
  , Lead = mongoose.model('Lead');

var ObjectId = mongoose.Types.ObjectId;

module.exports = {
  get : function (id, cb) {
    if (ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Lead.findById(id)
      .populate('activity')
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

    Lead.find(query)
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

    lead.created = Date.now();
    lead.lastUpdate = lead.created;

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

  logActivity : function (id, body, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    var activity = new Activity(body);

    activity.created = Date.now();

    activity.save(function (err, a) {
      if (err) return cb(err);

      Lead.findByIdAndUpdate(id, { $addToSet : { 'activity': a.id } })
        .exec(function (err, lead) {
          if (err) return cb(err);

          if (!lead) {
            return cb({ status : 404 });
          }

          return cb(null, a);
        });
    });
  },

  update : function (id, body, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    body.lastUpdate = Date.now();

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