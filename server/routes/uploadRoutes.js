const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const { uploadFile, uploadCV } = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profile image upload
router.post('/profiles', authMiddleware, uploadMiddleware('profiles').single('file'), uploadFile);

// CV upload (requires authentication)
router.post('/cv', authMiddleware, uploadMiddleware('cvs').single('cv'), uploadCV);

// Project image upload (requires authentication)
router.post('/projects', authMiddleware, uploadMiddleware('projects').single('file'), uploadFile);

// Skill icon upload (requires authentication)
router.post('/skills', authMiddleware, uploadMiddleware('skills').single('file'), uploadFile);

// Certificate image upload (requires authentication)
router.post('/certificates', authMiddleware, uploadMiddleware('certificates').single('file'), uploadFile);

// Testimonial client image upload (requires authentication)
router.post('/testimonials', authMiddleware, uploadMiddleware('testimonials').single('file'), uploadFile);


module.exports = router;
