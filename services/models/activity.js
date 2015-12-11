var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var ActivitySchema = new mongoose.Schema({
  op : { type : String, required : true },
  lead : { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  createdAt : { type: Date, required : true },
  comment : { type : String, required : true }
}, { collection: 'activity' });

module.exports = mongoose.model('Activity', ActivitySchema);