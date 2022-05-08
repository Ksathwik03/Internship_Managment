const mongoose = require("mongoose");

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
      // unique: true
    },

    branch: {
      type: String
    },

    resume: {
      type: String
    },

    CGPA: {
      type: Number,
    },

    phoneNo: {
      type: String
    },

    token: { type: String },

    isStudent: {
      default: true,
      type: Boolean,
    },

  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
