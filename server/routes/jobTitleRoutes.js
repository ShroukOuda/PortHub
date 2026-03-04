const express = require('express');
const router = express.Router();
const {
    getActiveJobTitles,
    getAllJobTitles,
    createJobTitle,
    updateJobTitle,
    deleteJobTitle,
    toggleJobTitleStatus
} = require('../controllers/jobTitleController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public route - get active job titles
router.get('/active', getActiveJobTitles);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllJobTitles);
router.post('/', authMiddleware, roleMiddleware(['admin']), createJobTitle);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateJobTitle);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteJobTitle);
router.patch('/:id/toggle', authMiddleware, roleMiddleware(['admin']), toggleJobTitleStatus);

module.exports = router;
