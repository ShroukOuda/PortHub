const express = require('express');
const router = express.Router();
const {
    getAllSkillDefinitions,
    getAllSkillDefinitionsAdmin,
    createSkillDefinition,
    updateSkillDefinition,
    deleteSkillDefinition,
    getCategories
} = require('../controllers/skillDefinitionController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public routes
router.get('/', getAllSkillDefinitions);
router.get('/categories', getCategories);

// Admin routes
router.get('/admin', authMiddleware, roleMiddleware(['admin']), getAllSkillDefinitionsAdmin);
router.post('/', authMiddleware, roleMiddleware(['admin']), createSkillDefinition);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateSkillDefinition);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteSkillDefinition);

module.exports = router;
