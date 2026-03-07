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
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            // Password not required for OAuth users
            return !this.googleId && !this.githubId;
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    authProvider: {
        type: String,
        enum: ['local', 'google', 'github'],
        default: 'local'
    },
    profilePicture: {
        type: String,
        default: 'default-profile.png',
        trim: true
    },
    bio: {
        type: String,
        maxlength: 500,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    dateOfBirth: {
        type: Date
    },
    country: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    profileImage: {
        type: String,
        default: ''
    },
    
    // Password reset fields
    resetCode: {
        type: String
    },
    resetCodeExpiry: {
        type: Date
    }
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);