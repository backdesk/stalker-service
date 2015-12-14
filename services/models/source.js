var mongoose = require('mongoose');

var SourceSchema = new mongoose.Schema({
  name : { type : String, required : true },
  company : { type : String },
  type : { type : String, required : true },
  createdAt : { type: Date, required: true },
  lastContactAt : { type: Date },
  status: { type : String, required : true, enum : ['chasing', 'waiting', 'dormant'] },
  phone : { type : String },
  email : { type : String },
  notes : { type : String },
  scratches : { type: Number, default : 0 },
  tickles : { type: Number, default : 0},
  strikes : { type: Number, default : 0}
});

module.exports = mongoose.model('Source', SourceSchema);