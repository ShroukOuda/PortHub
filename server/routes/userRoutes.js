const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser,
    logoutUser,
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', registerUser); 
router.post('/login', loginUser);       


router.get('/', getAllUsers);          
router.get('/:id',  getUserById);      
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);       
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);   
router.post('/logout', authMiddleware, logoutUser);    


module.exports = router;