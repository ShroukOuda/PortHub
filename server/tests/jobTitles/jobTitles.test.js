const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const JobTitle = require('../../models/JobTitle');
const { hashPassword } = require('../../utils/hash');

describe('Job Titles API', () => {
  let adminToken;
  let userToken;
  let jobTitleId;

  const adminUser = {
    firstName: 'JobTitle',
    lastName: 'Admin',
    username: 'jobtitleadmin',
    email: 'jobtitleadmin@example.com',
    phone: '8888888881',
    password: 'AdminPass123!',
    gender: 'male',
    dateOfBirth: '1988-01-01',
    country: 'Palestine',
    city: 'Gaza',
    address: '8 Admin St',
    role: 'admin'
  };

  const regularUser = {
    firstName: 'JobTitle',
    lastName: 'User',
    username: 'jobtitleuser',
    email: 'jobtitleuser@example.com',
    phone: '8888888882',
    password: 'UserPass123!',
    gender: 'female',
    dateOfBirth: '1995-05-05',
    country: 'Palestine',
    city: 'Gaza',
    address: '9 User St',
    role: 'user'
  };

  beforeAll(async () => {
    await User.deleteMany({ email: { $in: [adminUser.email, regularUser.email] } });
    await JobTitle.deleteMany({ title: { $in: ['Full Stack Developer', 'Senior Full Stack Developer', 'Unauthorized Title', 'No Auth Title'] } });

    const adminHashed = await hashPassword(adminUser.password);
    await User.create({ ...adminUser, password: adminHashed });

    const userHashed = await hashPassword(regularUser.password);
    await User.create({ ...regularUser, password: userHashed });

    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ login: adminUser.email, password: adminUser.password });
    adminToken = adminLogin.body.accessToken;

    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ login: regularUser.email, password: regularUser.password });
    userToken = userLogin.body.accessToken;
  });

  describe('POST /api/job-titles (admin)', () => {
    it('should create a job title', async () => {
      const res = await request(app)
        .post('/api/job-titles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Full Stack Developer' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('Full Stack Developer');
      jobTitleId = res.body._id;
    });

    it('should reject duplicate title', async () => {
      const res = await request(app)
        .post('/api/job-titles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Full Stack Developer' });
      expect(res.statusCode).toBe(409);
    });

    it('should reject empty title', async () => {
      const res = await request(app)
        .post('/api/job-titles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: '' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail for regular user', async () => {
      const res = await request(app)
        .post('/api/job-titles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Unauthorized Title' });
      expect(res.statusCode).toBe(403);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/job-titles')
        .send({ title: 'No Auth Title' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/job-titles/active (public)', () => {
    it('should return active job titles', async () => {
      const res = await request(app).get('/api/job-titles/active');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/job-titles (admin)', () => {
    it('should return all job titles with pagination', async () => {
      const res = await request(app)
        .get('/api/job-titles')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should support search', async () => {
      const res = await request(app)
        .get('/api/job-titles?search=Full')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail for regular user', async () => {
      const res = await request(app)
        .get('/api/job-titles')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('PUT /api/job-titles/:id (admin)', () => {
    it('should update a job title', async () => {
      const res = await request(app)
        .put(`/api/job-titles/${jobTitleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Senior Full Stack Developer' });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Senior Full Stack Developer');
    });

    it('should return 404 for non-existent', async () => {
      const res = await request(app)
        .put('/api/job-titles/000000000000000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Ghost Title' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PATCH /api/job-titles/:id/toggle (admin)', () => {
    it('should toggle job title active status', async () => {
      const res = await request(app)
        .patch(`/api/job-titles/${jobTitleId}/toggle`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.isActive).toBe(false);
    });

    it('should toggle back to active', async () => {
      const res = await request(app)
        .patch(`/api/job-titles/${jobTitleId}/toggle`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.isActive).toBe(true);
    });
  });

  describe('DELETE /api/job-titles/:id (admin)', () => {
    it('should delete a job title', async () => {
      const res = await request(app)
        .delete(`/api/job-titles/${jobTitleId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Job title deleted successfully');
    });

    it('should return 404 for already deleted', async () => {
      const res = await request(app)
        .delete(`/api/job-titles/${jobTitleId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
