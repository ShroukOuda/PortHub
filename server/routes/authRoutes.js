const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware')('profiles');

router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
