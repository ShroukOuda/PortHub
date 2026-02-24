const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const { uploadFile, uploadCV } = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profile image upload
router.post('/profiles', uploadMiddleware('profiles').single('file'), uploadFile);

// CV upload (requires authentication)
router.post('/cv', authMiddleware, uploadMiddleware('cvs').single('cv'), uploadCV);


module.exports = router;
