var mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
	created : { type: Date, required: true },
	lastUpdate : { type: Date },
	details : { type : String, required : true },
	description : { type : String },
	status : { type : String, required : true },
  source :{
    name : { type : String, required : true },
    company : { type : String },
    channel : { type : String, required : true },
    type : { type : String, required : true }
  },
  activity : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('Lead', LeadSchema);