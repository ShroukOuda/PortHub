const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Service', ServiceSchema);