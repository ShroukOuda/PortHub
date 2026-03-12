const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Experience = require('../../models/Experience');
const { hashPassword } = require('../../utils/hash');

describe('Experiences API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let experienceId;

  const testUser = {
    firstName: 'Exp',
    lastName: 'Tester',
    username: 'exptester',
    email: 'exptester@example.com',
    phone: '3333333331',
    password: 'ExpPass123!',
    gender: 'male',
    dateOfBirth: '1990-08-25',
    country: 'Palestine',
    city: 'Gaza',
    address: '3 Exp St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Experience.deleteMany({ portfolioId: existingPortfolio._id });
        await Portfolio.deleteOne({ _id: existingPortfolio._id });
      }
      await User.deleteOne({ _id: existing._id });
    }

    const hashed = await hashPassword(testUser.password);
    const created = await User.create({ ...testUser, password: hashed });
    userId = created._id.toString();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.email, password: testUser.password });
    userToken = loginRes.body.accessToken;

    const portfolioRes = await request(app)
      .post('/api/portfolios')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Exp Portfolio', About: 'Testing experiences API' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/experiences', () => {
    it('should create an experience', async () => {
      const res = await request(app)
        .post('/api/experiences')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Senior Developer',
          company: 'TechCorp',
          position: 'Full Stack Developer',
          startDate: '2022-01-01',
          endDate: '2024-06-30',
          description: 'Built scalable web applications',
          location: 'Remote',
          technologies: ['Node.js', 'Angular']
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('Senior Developer');
      experienceId = res.body.data._id;
    });

    it('should reject invalid dates (start >= end)', async () => {
      const res = await request(app)
        .post('/api/experiences')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Bad Dates',
          company: 'DateCorp',
          startDate: '2024-06-30',
          endDate: '2022-01-01'
        });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/experiences')
        .send({ title: 'Fail', company: 'Nobody' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/experiences/my', () => {
    it('should return user experiences', async () => {
      const res = await request(app)
        .get('/api/experiences/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/experiences/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/experiences/portfolio/:portfolioId', () => {
    it('should return experiences for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/experiences/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/experiences/:id', () => {
    it('should return a single experience', async () => {
      const res = await request(app)
        .get(`/api/experiences/${experienceId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Senior Developer');
    });

    it('should return 404 for non-existent experience', async () => {
      const res = await request(app)
        .get('/api/experiences/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/experiences/:id', () => {
    it('should update an experience', async () => {
      const res = await request(app)
        .put(`/api/experiences/${experienceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Lead Developer', company: 'TechCorp Inc.' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Lead Developer');
    });

    it('should reject invalid dates on update', async () => {
      const res = await request(app)
        .put(`/api/experiences/${experienceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ startDate: '2025-01-01', endDate: '2020-01-01' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/experiences/${experienceId}`)
        .send({ title: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/experiences/:id', () => {
    it('should delete an experience', async () => {
      const res = await request(app)
        .delete(`/api/experiences/${experienceId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Experience deleted successfully');
    });

    it('should return 404 for already deleted experience', async () => {
      const res = await request(app)
        .get(`/api/experiences/${experienceId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
