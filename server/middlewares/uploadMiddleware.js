const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadMiddleware = (type) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = `uploads/${type}/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2,'0')}`;
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, `${type}-${timestamp}${ext}`);
    }
  });

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
      // Allow only images and PDFs
      if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') cb(null, true);
      else cb(new Error('File type not allowed!'), false);
    }
  });
};

module.exports = uploadMiddleware;
