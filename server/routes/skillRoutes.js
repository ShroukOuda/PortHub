const express = require('express');
const router = express.Router();
const {
    createSkill,
    getSkillsByPortfolioId,
    updateSkill,
    deleteSkill,
    getSkillById,
    getMySkills
} = require('../controllers/skillController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own skills route (must be before parameterized routes)
router.get('/my', authMiddleware, getMySkills);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createSkill);
router.put('/:skillId', authMiddleware, roleMiddleware(['user', 'admin']), updateSkill);
router.delete('/:skillId', authMiddleware, roleMiddleware(['user', 'admin']), deleteSkill);
router.get('/:skillId', getSkillById);
router.get('/portfolio/:portfolioId', getSkillsByPortfolioId);

module.exports = router;