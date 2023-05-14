const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    }
})

exports.Client = mongoose.model('Client', clientSchema);