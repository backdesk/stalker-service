var mongoose = require('mongoose');

module.exports = mongoose.model('Activity', new mongoose.Schema({
  op : { type : String, required : true },
  comment : { type : String, required : true },
  createdAt : { type: Date, required: true}
}));