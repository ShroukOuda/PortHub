const express = require('express');
const router = express.Router();
const {
    createEducation,
    getEducationByPortfolioId,
    getEducationById,
    updateEducation,
    deleteEducation
} = require('../controllers/educationController');

const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createEducation);
router.get('/portfolio/:portfolioId', getEducationByPortfolioId);
router.get('/:educationId', getEducationById);
router.put('/:educationId', authMiddleware, roleMiddleware(['user']), updateEducation);
router.delete('/:educationId', authMiddleware, roleMiddleware(['user']), deleteEducation);

module.exports = router;