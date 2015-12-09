var mongoose = require('mongoose')
  , Lead = mongoose.model('Lead');

var ObjectId = mongoose.Types.ObjectId;

module.exports = {
	get : function (id, cb) {
    if(ObjectId.isValid(id) === false) {
      return cb({ status : 400 });
    }

    Lead.findById(id)
      .exec(function (err, lead) {
        if(err) return cb(err, null);

        if(!lead) {
          return cb({ status : 404 });
        }

        return cb(null, lead);
      });
  },

  find : function (params, cb) {
		var query = {};

    if(params) {
      if(params.status) {
        query.status = params.status;
      }
    }

    Lead.find(query)
      .exec(function (err, leads) {
        if(err) return cb(err, null);

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
      if(err) return cb(err, null);

      return cb();
    });
  },

  create : function (body, cb) {
    var lead = new Lead(body);

    lead.save(function (err, lead) {
      if(err) {
        return cb(err)
      } else {
        return cb(null, lead);
      }
    })
  },

  update : function (id, lead, cb) {

  }
};