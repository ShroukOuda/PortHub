const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getPublicStats,
    getUsersWithPublicPortfolios,
    getUserById, 
    updateUser, 
    deleteUser,
    updateMyProfile,
    changePassword,
    getMyProfile
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public routes (no auth required)
router.get('/stats', getPublicStats);
router.get('/public', getUsersWithPublicPortfolios);

// User self-management routes (protected - any authenticated user)
router.get('/me', authMiddleware, getMyProfile);
router.put('/me', authMiddleware, updateMyProfile);
router.put('/me/password', authMiddleware, changePassword);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);
router.get('/:id',  getUserById);      
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);       
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);   
 


module.exports = router;