const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../../app');
const User = require('../../models/User');
const { hashPassword } = require('../../utils/hash');

describe('Uploads API', () => {
  let userToken;
  const uploadedFiles = [];

  const testUser = {
    firstName: 'Upload',
    lastName: 'Tester',
    username: 'uploadtester',
    email: 'uploadtester@example.com',
    phone: '1010101010',
    password: 'UploadPass123!',
    gender: 'female',
    dateOfBirth: '1994-03-15',
    country: 'Palestine',
    city: 'Gaza',
    address: '12 Upload St',
    role: 'user'
  };

  // Create a tiny 1x1 PNG in memory for testing
  const createTestImage = () => {
    const pngHeader = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // 8-bit RGB
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
      0x00, 0x00, 0x02, 0x00, 0x01, 0xe2, 0x21, 0xbc,
      0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, // IEND chunk
      0x44, 0xae, 0x42, 0x60, 0x82
    ]);
    const tmpPath = path.join(__dirname, 'test-image.png');
    fs.writeFileSync(tmpPath, pngHeader);
    return tmpPath;
  };

  let testImagePath;

  beforeAll(async () => {
    await User.deleteMany({ email: testUser.email });

    const hashed = await hashPassword(testUser.password);
    await User.create({ ...testUser, password: hashed });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.email, password: testUser.password });
    userToken = loginRes.body.accessToken;

    testImagePath = createTestImage();
  });

  afterAll(async () => {
    // Clean up test image
    if (testImagePath && fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    // Clean up uploaded files
    for (const filePath of uploadedFiles) {
      const fullPath = path.join(__dirname, '..', '..', filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  });

  describe('POST /api/uploads/profiles', () => {
    it('should upload a profile image (no auth required)', async () => {
      const res = await request(app)
        .post('/api/uploads/profiles')
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('path');
      expect(res.body).toHaveProperty('url');
      uploadedFiles.push(res.body.path);
    });

    it('should fail without a file', async () => {
      const res = await request(app)
        .post('/api/uploads/profiles');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/uploads/projects', () => {
    it('should upload a project image with auth', async () => {
      const res = await request(app)
        .post('/api/uploads/projects')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('path');
      uploadedFiles.push(res.body.path);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/uploads/projects')
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/uploads/skills', () => {
    it('should upload a skill icon with auth', async () => {
      const res = await request(app)
        .post('/api/uploads/skills')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('path');
      uploadedFiles.push(res.body.path);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/uploads/skills')
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/uploads/certificates', () => {
    it('should upload a certificate image with auth', async () => {
      const res = await request(app)
        .post('/api/uploads/certificates')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('path');
      uploadedFiles.push(res.body.path);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/uploads/certificates')
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/uploads/testimonials', () => {
    it('should upload a testimonial image with auth', async () => {
      const res = await request(app)
        .post('/api/uploads/testimonials')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('path');
      uploadedFiles.push(res.body.path);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/uploads/testimonials')
        .attach('file', testImagePath);
      expect(res.statusCode).toBe(401);
    });
  });
});
