var mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
  createdAt : { type: Date, required: true },
  updatedAt : { type: Date },
  details : { type : String, required : true },
  description : { type : String },
  status : { type : String, required : true },
  source :{
    name : { type : String, required : true },
    company : { type : String },
    type : { type : String, required : true }
  },
  channel : { type : String, required : true },
  activity : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  activityCount : {type: Number, default: 0}
});


module.exports = mongoose.model('Lead', LeadSchema);