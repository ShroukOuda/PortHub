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
        trim: true
    },
    description: {
        type: String,
        required: false,
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
        trim: true
    },
    issueDate: {
        type: Date,
        required: false,
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
    credentialId: {
        type: String,
        required: false,
        trim: true
    },
    credentialUrl: {
        type: String,
        required: false,
        trim: true
    },
}, {
    timestamps: true,
});

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;