const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Service = require('../../models/Service');
const { hashPassword } = require('../../utils/hash');

describe('Services API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let serviceId;

  const testUser = {
    firstName: 'Svc',
    lastName: 'Tester',
    username: 'svctester',
    email: 'svctester@example.com',
    phone: '6666666666',
    password: 'SvcPass123!',
    gender: 'female',
    dateOfBirth: '1996-07-20',
    country: 'Palestine',
    city: 'Gaza',
    address: '6 Svc St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Service.deleteMany({ portfolioId: existingPortfolio._id });
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
      .send({ title: 'Svc Portfolio', About: 'Testing services API here' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/services', () => {
    it('should create a service', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Web Development',
          description: 'Full-stack web development services'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('Web Development');
      serviceId = res.body.data._id;
    });

    it('should fail without title', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ description: 'No title provided' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/services')
        .send({ title: 'Fail Service' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/services/my', () => {
    it('should return user services', async () => {
      const res = await request(app)
        .get('/api/services/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/services/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/services/portfolio/:portfolioId', () => {
    it('should return services for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/services/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/services/:serviceId', () => {
    it('should return a single service', async () => {
      const res = await request(app)
        .get(`/api/services/${serviceId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Web Development');
    });

    it('should return 404 for non-existent service', async () => {
      const res = await request(app)
        .get('/api/services/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/services/:serviceId', () => {
    it('should update a service', async () => {
      const res = await request(app)
        .put(`/api/services/${serviceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Full-Stack Development', description: 'End-to-end solutions' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Full-Stack Development');
    });

    it('should fail without title on update', async () => {
      const res = await request(app)
        .put(`/api/services/${serviceId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: '', description: 'No title' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/services/${serviceId}`)
        .send({ title: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/services/:serviceId', () => {
    it('should delete a service', async () => {
      const res = await request(app)
        .delete(`/api/services/${serviceId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Service deleted successfully');
    });

    it('should verify service is deleted', async () => {
      const res = await request(app)
        .get(`/api/services/${serviceId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
