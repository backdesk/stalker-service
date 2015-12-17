var mongoose = require('mongoose');

module.exports = mongoose.model('Tag', new mongoose.Schema({
  name : { type : String, required : true },
  description : { type: String },
  weight : { type : Number, required : true }
}));