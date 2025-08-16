const Certificate = require('../models/Certificate');

const createCertificate = async (req, res) => {
    const { portfolioId, title, description, technologies, issuer, issueDate, expirationDate, CertificateImage } = req.body;

    try {
        const newCertificate = new Certificate({
            portfolioId,
            title,
            description,
            technologies,
            issuer,
            issueDate,
            expirationDate,
            CertificateImage
        });

        const savedCertificate = await newCertificate.save();
        res.status(201).json(savedCertificate);
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
    const { title, description, technologies, issuer, issueDate, expirationDate, CertificateImage } = req.body;

    try {
        const updatedCertificate = await Certificate.findByIdAndUpdate(certificateId, {
            title,
            description,
            technologies,
            issuer,
            issueDate,
            expirationDate,
            CertificateImage
        }, { new: true });
        res.status(200).json(updatedCertificate);
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
    deleteCertificate
};