const express = require('express');
const router = express.Router();
const {
    createExperience,
    getExperienceByPortfolioId,
    getExperienceById,
    updateExperience,
    deleteExperience
} = require('../controllers/experienceController');

router.post('/', createExperience);
router.get('/portfolio/:portfolioId', getExperienceByPortfolioId);
router.get('/:id', getExperienceById);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;