const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Education = require('../../models/Education');
const { hashPassword } = require('../../utils/hash');

describe('Educations API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let educationId;

  const testUser = {
    firstName: 'Edu',
    lastName: 'Tester',
    username: 'edutester',
    email: 'edutester@example.com',
    phone: '4444444444',
    password: 'EduPass123!',
    gender: 'female',
    dateOfBirth: '1997-11-05',
    country: 'Palestine',
    city: 'Gaza',
    address: '4 Edu St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Education.deleteMany({ portfolioId: existingPortfolio._id });
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
      .send({ title: 'Edu Portfolio', About: 'Testing education API' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/educations', () => {
    it('should create an education entry', async () => {
      const res = await request(app)
        .post('/api/educations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          institution: 'University of Gaza',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: '2018-09-01',
          endDate: '2022-06-30',
          description: 'Graduated with honours',
          gpa: '3.8'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.institution).toBe('University of Gaza');
      educationId = res.body.data._id;
    });

    it('should reject invalid dates (start >= end)', async () => {
      const res = await request(app)
        .post('/api/educations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          institution: 'Bad Dates Uni',
          degree: 'BS',
          startDate: '2025-01-01',
          endDate: '2020-01-01'
        });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/educations')
        .send({ institution: 'Fail Uni', degree: 'BS' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/educations/my', () => {
    it('should return user education', async () => {
      const res = await request(app)
        .get('/api/educations/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/educations/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/educations/portfolio/:portfolioId', () => {
    it('should return education for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/educations/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/educations/:educationId', () => {
    it('should return a single education entry', async () => {
      const res = await request(app)
        .get(`/api/educations/${educationId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.institution).toBe('University of Gaza');
    });

    it('should return 404 for non-existent education', async () => {
      const res = await request(app)
        .get('/api/educations/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/educations/:educationId', () => {
    it('should update an education entry', async () => {
      const res = await request(app)
        .put(`/api/educations/${educationId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ degree: 'Master of Science', gpa: '3.9' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.degree).toBe('Master of Science');
    });

    it('should reject invalid dates on update', async () => {
      const res = await request(app)
        .put(`/api/educations/${educationId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ startDate: '2025-01-01', endDate: '2020-01-01' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/educations/${educationId}`)
        .send({ degree: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/educations/:educationId', () => {
    it('should delete an education entry', async () => {
      const res = await request(app)
        .delete(`/api/educations/${educationId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Education deleted successfully');
    });

    it('should verify education is deleted', async () => {
      const res = await request(app)
        .get(`/api/educations/${educationId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
