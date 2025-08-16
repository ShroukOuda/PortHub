const express = require('express');
const router = express.Router();
const {
    createSkill,
    getSkillsByPortfolioId,
    updateSkill,
    deleteSkill,
    getSkillById
} = require('../controllers/skillController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createSkill);
router.put('/:skillId', authMiddleware, roleMiddleware(['user']), updateSkill);
router.delete('/:skillId', authMiddleware, roleMiddleware(['user']), deleteSkill);
router.get('/:skillId', getSkillById);
router.get('/portfolio/:portfolioId', getSkillsByPortfolioId);

module.exports = router;