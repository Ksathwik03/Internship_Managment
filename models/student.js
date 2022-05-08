const mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')

const StudentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },

    enrollmentNumber: {
      type: String,
      unique: true
    },

    branch: {
      type: String
    },

    resume: {
      type: Buffer
    },

    CGPA: {
      type: Float32Array
    },

    token: { type: String },

    isStudent: {
      default: true,
      type: Boolean,
    },

  },
  { timestamps: true }
);

StudentSchema.plugin(findOrCreate)
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
