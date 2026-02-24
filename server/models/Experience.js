const mongoose = require('mongoose');
const ExperienceSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    title: {
        type: String,
        required: false,
        maxlength: 100,
        trim: true
    },
    company: {
        type: String,
        required: false,
        maxlength: 100,
        trim: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: false,
        maxlength: 1000,
        trim: true,
        default: ''
    },
    position: {
        type: String,
        required: false,
        maxlength: 100,
        trim: true
    },
    location: {
        type: String,
        required: false,
        maxlength: 100,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Experience', ExperienceSchema);