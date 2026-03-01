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

  // Define allowed file types based on upload type
  const allowedTypes = {
    profiles: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    cvs: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    projects: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    skills: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    certificates: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    testimonials: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  };

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
      const allowed = allowedTypes[type] || [];
      
      // For image-based types, also allow any image type
      const imageTypes = ['profiles', 'projects', 'skills', 'certificates', 'testimonials'];
      if (imageTypes.includes(type) && file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`File type not allowed for ${type}!`), false);
      }
    }
  });
};

module.exports = uploadMiddleware;
