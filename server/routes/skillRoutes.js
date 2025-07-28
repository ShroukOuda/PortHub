const express = require('express');
const router = express.Router();
const {
    createSkill,
    getSkillsByPortfolioId,
    updateSkill,
    deleteSkill,
    getSkillById
} = require('../controllers/skillController');

router.post('/', createSkill);
router.put('/:skillId', updateSkill);
router.delete('/:skillId', deleteSkill);
router.get('/:skillId', getSkillById);
router.get('/portfolio/:portfolioId', getSkillsByPortfolioId);

module.exports = router;