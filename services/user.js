var mongoose = require('mongoose');
var user = mongoose.model('User');

var ObjectId = mongoose.Types.ObjectId;

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

