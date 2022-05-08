const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
const Faculty = require('./faculty');
Schema=mongoose.Schema;

const InternshipSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    facultyId: {
        type: Schema.Types.ObjectId,
        ref: Faculty
    },

    minCGPA: {
        type: Number
    },

    stipend: {
        type: Number
    },

    description: {
        type: String
    }

}, { timestamps: true });

const Internship = mongoose.model('Internship', InternshipSchema);
module.exports = Internship;