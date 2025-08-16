const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
        trim: true
    },
    technologies: {
        type: [String],
        required: false,
        default: []
    },
    issuer: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        required: false,
        default: null
    },
    CertificateImage: {
        type: String,
        required: false,
        default: 'default-certificate-image.png',
        trim: true
    },
}, {
    timestamps: true,
});

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;