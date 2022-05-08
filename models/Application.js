const mongoose = require('mongoose');
const Faculty = require('./faculty');
const Internship = require('./internship');
const Student = require('./student');
Schema=mongoose.Schema;

const ApplicationSchema = new mongoose.Schema({

    id: {
        type: String,
    },

    intershipId: {
        type: Schema.Types.ObjectId,
        ref: Internship
    },

    facultyId: {
        type: Schema.Types.ObjectId,
        ref: Faculty
    },

    studentId: {
        type: Schema.Types.ObjectId,
        ref: Student
    },

    experience: {
        type: String
    },

    whyHire: {
        type: String
    },

    isApproved: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;