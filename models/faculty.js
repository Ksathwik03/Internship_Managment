const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create')

const FacultySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  areaOfInterest: {
    type: String,
  },
  phoneNo: {
    type: String
  },
  qualifications: {
    type: Array
  },
  website: {
    type: String
  },

  token: { type: String },

  isStudent: {
    default: false,
    type: Boolean
  },

}, { timestamps: true });

FacultySchema.plugin(findOrCreate)
const Faculty = mongoose.model('Faculty', FacultySchema);
module.exports = Faculty;