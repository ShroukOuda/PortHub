const mongoose = require('mongoose');
const EducationSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    institution: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    fieldOfStudy: {
        type: String,
        required: false,
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
        required: false,
        minlength: 2,
        maxlength: 500,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Education', EducationSchema);
