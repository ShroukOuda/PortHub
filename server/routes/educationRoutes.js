const express = require('express');
const router = express.Router();
const {
    createEducation,
    getEducationByPortfolioId,
    getEducationById,
    updateEducation,
    deleteEducation
} = require('../controllers/educationController');

router.post('/', createEducation);
router.get('/portfolio/:portfolioId', getEducationByPortfolioId);
router.get('/:educationId', getEducationById);
router.put('/:educationId', updateEducation);
router.delete('/:educationId', deleteEducation);

module.exports = router;