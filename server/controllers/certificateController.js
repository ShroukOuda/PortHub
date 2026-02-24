const Certificate = require('../models/Certificate');
const Portfolio = require('../models/Portfolio');

// Get current user's certificates
const getMyCertificates = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const certificates = await Certificate.find({ portfolioId: portfolio._id }).sort({ issueDate: -1 });
        res.status(200).json({ data: certificates });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certificates', error: error.message });
    }
};

const createCertificate = async (req, res) => {
    const { title, name, description, technologies, issuer, issueDate, expirationDate, expiryDate, CertificateImage, credentialId, credentialUrl } = req.body;
    let { portfolioId } = req.body;

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        // Map name to title if title is not provided
        const certificateTitle = title || name;
        // Default description if not provided
        const certificateDescription = description || `${certificateTitle} certification`;

        const newCertificate = new Certificate({
            portfolioId,
            title: certificateTitle,
            description: certificateDescription,
            technologies,
            issuer,
            issueDate: issueDate || new Date(),
            expirationDate: expirationDate || expiryDate || null,
            CertificateImage,
            credentialId,
            credentialUrl
        });

        const savedCertificate = await newCertificate.save();
        res.status(201).json({ data: savedCertificate });
    } catch (error) {
        res.status(500).json({ message: 'Error creating certificate', error: error.message });
    }
}

const getCertificatesByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const certificates = await Certificate.find({ portfolioId });
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certificates', error: error.message });
    }
}

const getCertificateById = async (req, res) => {
    const { certificateId } = req.params;

    try {
        const certificate = await Certificate.findById(certificateId);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching certificate', error: error.message });
    }
};

const updateCertificate = async (req, res) => {
    const { certificateId } = req.params;
    const { title, name, description, technologies, issuer, issueDate, expirationDate, expiryDate, CertificateImage, credentialId, credentialUrl } = req.body;

    try {
        const updateData = {};
        if (title || name) updateData.title = title || name;
        if (description) updateData.description = description;
        if (technologies) updateData.technologies = technologies;
        if (issuer) updateData.issuer = issuer;
        if (issueDate) updateData.issueDate = issueDate;
        if (expirationDate || expiryDate) updateData.expirationDate = expirationDate || expiryDate;
        if (CertificateImage) updateData.CertificateImage = CertificateImage;
        if (credentialId) updateData.credentialId = credentialId;
        if (credentialUrl) updateData.credentialUrl = credentialUrl;

        const updatedCertificate = await Certificate.findByIdAndUpdate(certificateId, updateData, { new: true });
        res.status(200).json({ data: updatedCertificate });
    } catch (error) {
        res.status(500).json({ message: 'Error updating certificate', error: error.message });
    }
};

const deleteCertificate = async (req, res) => {
    const { certificateId } = req.params;

    try {
        await Certificate.findByIdAndDelete(certificateId);
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting certificate', error: error.message });
    }
};

module.exports = {
    createCertificate,
    getCertificatesByPortfolioId,
    getCertificateById,
    updateCertificate,
    deleteCertificate,
    getMyCertificates
};