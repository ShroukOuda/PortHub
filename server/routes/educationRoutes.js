const express = require('express');
const router = express.Router();
const {
    createEducation,
    getEducationByPortfolioId,
    getEducationById,
    updateEducation,
    deleteEducation,
    getMyEducation
} = require('../controllers/educationController');

const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// User's own education route
router.get('/my', authMiddleware, getMyEducation);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createEducation);
router.get('/portfolio/:portfolioId', getEducationByPortfolioId);
router.get('/:educationId', getEducationById);
router.put('/:educationId', authMiddleware, roleMiddleware(['user', 'admin']), updateEducation);
router.delete('/:educationId', authMiddleware, roleMiddleware(['user', 'admin']), deleteEducation);

module.exports = router;