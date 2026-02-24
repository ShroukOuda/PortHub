const express = require('express');
const router = express.Router();
const {
    createExperience,
    getExperienceByPortfolioId,
    getExperienceById,
    updateExperience,
    deleteExperience,
    getMyExperience
} = require('../controllers/experienceController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own experience route
router.get('/my', authMiddleware, getMyExperience);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createExperience);
router.get('/portfolio/:portfolioId', getExperienceByPortfolioId);
router.get('/:id', getExperienceById);
router.put('/:id', authMiddleware, roleMiddleware(['user', 'admin']), updateExperience);
router.delete('/:id', authMiddleware, roleMiddleware(['user', 'admin']), deleteExperience);

module.exports = router;