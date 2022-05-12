const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    roll: {
        type: Number,
        required: true,
    },
    wad: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    dsbda: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    cns: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    cc: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    ai: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
});

const studentModel = mongoose.model('studentmark', studentSchema);

module.exports = studentModel;