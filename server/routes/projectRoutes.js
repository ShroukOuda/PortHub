const express = require('express');
const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjectsByPortfolioId
} = require('../controllers/projectController');

router.post('/', createProject); // Create a new project
router.put('/:projectId', updateProject); // Update a project by ID
router.delete('/:projectId', deleteProject); // Delete a project by ID
router.get('/:projectId', getProjectById); // Get a project by ID
router.get('/portfolio/:portfolioId', getAllProjectsByPortfolioId); // Get all projects by portfolio ID



module.exports = router;