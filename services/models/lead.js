var mongoose = require('mongoose');

var LeadSchema = new mongoose.Schema({
	created : { type: Date },
	lastUpdate : { type: Date },
	details : { type : String, required : true },
	description : { type : String },
	status : { type : String, required : true }
});

module.exports = mongoose.model('Lead', LeadSchema);