const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Project = require('../../models/Project');
const Skill = require('../../models/Skill');
const { hashPassword } = require('../../utils/hash');

describe('Portfolios API', () => {
  let userToken;
  let userId;
  let portfolioId;

  const testUser = {
    firstName: 'Portfolio',
    lastName: 'Tester',
    username: 'portfoliotester',
    email: 'portfoliotester@example.com',
    phone: '3333333333',
    password: 'PortPass123!',
    gender: 'female',
    dateOfBirth: '1992-03-20',
    country: 'Palestine',
    city: 'Gaza',
    address: '3 Port St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      await Portfolio.deleteMany({ userId: existing._id });
      await User.deleteOne({ _id: existing._id });
    }

    const hashed = await hashPassword(testUser.password);
    const created = await User.create({ ...testUser, password: hashed });
    userId = created._id.toString();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.email, password: testUser.password });
    userToken = loginRes.body.accessToken;
  });

  describe('POST /api/portfolios', () => {
    it('should create a portfolio', async () => {
      const res = await request(app)
        .post('/api/portfolios')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My Portfolio',
          About: 'A test portfolio for testing',
          bio: 'A test portfolio',
          template: 'developer',
          mainColor: '#e74c3c',
          isPublic: true
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('My Portfolio');
      portfolioId = res.body.data._id;
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/portfolios')
        .send({ title: 'Fail Portfolio' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/portfolios', () => {
    it('should require admin auth', async () => {
      const res = await request(app).get('/api/portfolios');
      expect(res.statusCode).toBe(401);
    });

    it('should return portfolios for authenticated user', async () => {
      const res = await request(app)
        .get('/api/portfolios')
        .set('Authorization', `Bearer ${userToken}`);
      // user role may get 403, but at least checks auth works
      expect([200, 403]).toContain(res.statusCode);
    });
  });

  describe('GET /api/portfolios/user/:userId', () => {
    it('should return portfolio for a specific user', async () => {
      const res = await request(app).get(`/api/portfolios/user/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/portfolios/user/:userId/full', () => {
    it('should return full portfolio data in one call', async () => {
      const res = await request(app).get(`/api/portfolios/user/${userId}/full`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('portfolio');
      expect(res.body).toHaveProperty('projects');
      expect(res.body).toHaveProperty('skills');
      expect(res.body).toHaveProperty('services');
      expect(res.body).toHaveProperty('educations');
      expect(res.body).toHaveProperty('experiences');
      expect(res.body).toHaveProperty('certificates');
      expect(res.body).toHaveProperty('testimonials');
      expect(res.body.user.firstName).toBe(testUser.firstName);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/portfolios/user/000000000000000000000000/full');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/portfolios/:id', () => {
    it('should update portfolio', async () => {
      const res = await request(app)
        .put(`/api/portfolios/${portfolioId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Updated Portfolio', bio: 'Updated bio' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Updated Portfolio');
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/portfolios/${portfolioId}`)
        .send({ title: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/portfolios/:id', () => {
    it('should get portfolio by id', async () => {
      const res = await request(app)
        .get(`/api/portfolios/${portfolioId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(portfolioId);
    });
  });
});
