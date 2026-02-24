const express = require('express');
const router = express.Router();
const {
    getAdminStats,
    getUsers,
    toggleUserStatus,
    changeUserRole,
    deleteUserByAdmin,
    getPortfolios,
    deletePortfolioByAdmin
} = require('../controllers/adminController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// All routes require admin role
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// Dashboard statistics
router.get('/stats', getAdminStats);

// User management
router.get('/users', getUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);
router.patch('/users/:id/role', changeUserRole);
router.delete('/users/:id', deleteUserByAdmin);

// Portfolio management
router.get('/portfolios', getPortfolios);
router.delete('/portfolios/:id', deletePortfolioByAdmin);

module.exports = router;
