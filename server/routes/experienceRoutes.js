const express = require('express');
const router = express.Router();
const {
    createExperience,
    getExperienceByPortfolioId,
    getExperienceById,
    updateExperience,
    deleteExperience
} = require('../controllers/experienceController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createExperience);
router.get('/portfolio/:portfolioId', getExperienceByPortfolioId);
router.get('/:id', getExperienceById);
router.put('/:id', authMiddleware, roleMiddleware(['user']), updateExperience);
router.delete('/:id', authMiddleware, roleMiddleware(['user']), deleteExperience);

module.exports = router;