const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const { uploadFile } = require('../controllers/uploadController');


router.post('/profiles', uploadMiddleware('profiles').single('file'), uploadFile);


module.exports = router;
