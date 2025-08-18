const express = require('express');
const router = express.Router();

const {
    createCertificate,
    getCertificatesByPortfolioId,
    getCertificateById,
    updateCertificate,
    deleteCertificate
} = require('../controllers/certificateController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createCertificate);
router.get('/:portfolioId', getCertificatesByPortfolioId);
router.get('/certificate/:certificateId', getCertificateById);
router.put('/certificate/:certificateId', authMiddleware, roleMiddleware(['user']), updateCertificate);
router.delete('/certificate/:certificateId', authMiddleware, roleMiddleware(['user']), deleteCertificate);

module.exports = router;
