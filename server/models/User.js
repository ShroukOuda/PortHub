const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9_]+$/,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false 

});

module.exports = mongoose.model('User', UserSchema);