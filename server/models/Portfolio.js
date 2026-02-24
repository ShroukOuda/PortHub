const mongoose = require('mongoose');
const { isAbaRouting } = require('validator');

const PortfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    About: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500, 
        trim: true
    },
    tagline: {
        type: String,
        maxlength: 200,
        trim: true,
        default: ''
    },
    bio: {
        type: String,
        maxlength: 1000,
        trim: true,
        default: ''
    },

    AboutImage: {
        type: String,
        default: 'default-about-image.png',
        trim: true
    },
    sociallinks: {
        github: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        }
    },
    theme: {
        primaryColor: {
            type: String,
            default: '#91729c'
        },
        secondaryColor: {
            type: String,
            default: '#432161'
        },
        backgroundColor: {
            type: String,
            default: '#1a1a2e'
        },
        textColor: {
            type: String,
            default: '#ffffff'
        },
        accentColor: {
            type: String,
            default: '#e9c46a'
        },
        fontFamily: {
            type: String,
            default: 'Inter'
        }
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    cvUrl: {
        type: String,
        default: '',
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    viewHistory: [{
        date: { type: Date, required: true },
        count: { type: Number, default: 1 }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);