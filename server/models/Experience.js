const mongoose = require('mongoose');
const ExperienceSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    company: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
        trim: true
    },
    position: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Experience', ExperienceSchema);