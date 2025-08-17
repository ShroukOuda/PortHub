const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

    


router.get('/', getAllUsers);          
router.get('/:id',  getUserById);      
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);       
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);   
 


module.exports = router;