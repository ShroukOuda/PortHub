const express = require('express');
const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjectsByPortfolioId
} = require('../controllers/projectController');

const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createProject); // Create a new project
router.put('/:projectId', authMiddleware, roleMiddleware(['user']), updateProject); // Update a project by ID
router.delete('/:projectId', authMiddleware, roleMiddleware(['user']), deleteProject); // Delete a project by ID
router.get('/:projectId', getProjectById); // Get a project by ID
router.get('/portfolio/:portfolioId', getAllProjectsByPortfolioId); // Get all projects by portfolio ID



module.exports = router;