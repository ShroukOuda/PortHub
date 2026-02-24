const mongoose = require('mongoose');
const EducationSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    institution: {
        type: String,
        required: false,
        maxlength: 200,
        trim: true
    },
    degree: {
        type: String,
        required: false,
        maxlength: 200,
        trim: true
    },
    fieldOfStudy: {
        type: String,
        required: false,
        maxlength: 200,
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
        trim: true
    },
    grade: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true
    },
    gpa: {
        type: String,
        required: false,
        maxlength: 20,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Education', EducationSchema);
