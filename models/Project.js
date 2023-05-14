const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    dateDue: {
        type: String,
        required: true,
    },
})

exports.Project = mongoose.model('Project', projectSchema);