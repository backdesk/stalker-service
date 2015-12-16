var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var ActivitySchema = new mongoose.Schema({
  op : { type : String, required : true },
  comment : { type : String, required : true }
}, { collection: 'activity' });

module.exports = mongoose.model('Activity', ActivitySchema);