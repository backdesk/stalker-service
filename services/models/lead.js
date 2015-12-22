var mongoose = require('mongoose')
  , moment = require('moment');

var ActivitySchema = mongoose.model('Activity').schema
  , TagSchema = mongoose.model('Tag').schema;

var LeadSchema = new mongoose.Schema({
  createdAt : { type: Date, required : true },
  updatedAt : { type: Date },
  details : { type : String, required : true },
  description : { type : String },
  status : { type : String, required : true, enum : ['pending', 'junk'] },
  source : { type : mongoose.Schema.Types.ObjectId, ref: 'Source', required: true },
  channel : { type : String, required : true },
  activity : [ActivitySchema],
  tags : [TagSchema],
  activityCount : { type : Number, default : 0 }
}, {
  toJSON : {
    virtuals : true
  }
});

LeadSchema.virtual('weight').get( function() {
  return 0;
});

module.exports = mongoose.model('Lead', LeadSchema);