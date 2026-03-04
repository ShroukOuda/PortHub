const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    name: {
        type: String,
        required: false,
        maxlength: 100,
        trim: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 1000,
        trim: true,
        default: ''
    },
    icon: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Service', ServiceSchema);