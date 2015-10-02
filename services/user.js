var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var user = mongoose.model('User');

module.exports =  {
  get : function (id, cb) {
    if(ObjectId.isValid(id)) {
      user.findById(new ObjectId(id))
        .exec(function (err, user) {
          return cb(err, user);
        });
    }
  },

  getByCredentials : function (username, password, cb) {
    user.findOne({ username : username })
      .exec(function (err, user) {
        return cb(err, user);
      });
  }
};

