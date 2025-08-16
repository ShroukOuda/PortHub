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
}, {
    timestamps: true,
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);