const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create')

const InternshipSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    comapany: {
        type: String,
    },
    areaOfInterest: {
        type: Array,
    },

    minCGPA: {
        type: Float32Array
    },

    stipend: {
        type: Number
    },




}, { timestamps: true });

InternshipSchema.plugin(findOrCreate)
const Internship = mongoose.model('Internship', InternshipSchema);
module.exports = Internship;