const express = require('express');
const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjectsByPortfolioId,
    getMyProjects
} = require('../controllers/projectController');

const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// User's own projects route (must be before parameterized routes)
router.get('/my', authMiddleware, getMyProjects);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createProject); // Create a new project
router.put('/:projectId', authMiddleware, roleMiddleware(['user', 'admin']), updateProject); // Update a project by ID
router.delete('/:projectId', authMiddleware, roleMiddleware(['user', 'admin']), deleteProject); // Delete a project by ID
router.get('/:projectId', getProjectById); // Get a project by ID
router.get('/portfolio/:portfolioId', getAllProjectsByPortfolioId); // Get all projects by portfolio ID



module.exports = router;