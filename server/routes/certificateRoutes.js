const express = require('express');
const router = express.Router();

const {
    createCertificate,
    getCertificatesByPortfolioId,
    getCertificateById,
    updateCertificate,
    deleteCertificate,
    getMyCertificates
} = require('../controllers/certificateController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own certificates route
router.get('/my', authMiddleware, getMyCertificates);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createCertificate);
router.get('/portfolio/:portfolioId', getCertificatesByPortfolioId);
router.get('/:certificateId', getCertificateById);
router.put('/:certificateId', authMiddleware, roleMiddleware(['user', 'admin']), updateCertificate);
router.delete('/:certificateId', authMiddleware, roleMiddleware(['user', 'admin']), deleteCertificate);

module.exports = router;
