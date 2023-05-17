const mongoose = require('mongoose');

const userSchema = new mongoose({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

exports.User = mongoose.model('User', userSchema);