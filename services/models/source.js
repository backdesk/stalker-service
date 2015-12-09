var mongoose = require('mongoose');

var SourceSchema = new mongoose.Schema({
	name: { type : String, required : true },
	company: { type : String },
	type: { type : String, required : true },
	lastContact: { type: Date },
	status: { type : String, required : true },
	phone : { type : String },
	email : { type : String },
	notes : { type : String }
});

module.exports = mongoose.model('Source', SourceSchema);