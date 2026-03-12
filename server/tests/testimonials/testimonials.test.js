const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Testimonial = require('../../models/Testimonial');
const { hashPassword } = require('../../utils/hash');

describe('Testimonials API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let testimonialId;

  const testUser = {
    firstName: 'Test',
    lastName: 'Tester',
    username: 'testtester',
    email: 'testtester@example.com',
    phone: '7777777777',
    password: 'TestPass123!',
    gender: 'male',
    dateOfBirth: '1991-12-01',
    country: 'Palestine',
    city: 'Gaza',
    address: '7 Test St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Testimonial.deleteMany({ portfolioId: existingPortfolio._id });
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
      .send({ title: 'Testimonial Portfolio', About: 'Testing testimonials API' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/testimonials', () => {
    it('should create a testimonial', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'Amazing work! Highly recommended.',
          author: 'Jane Doe',
          position: 'CTO',
          company: 'TechCorp',
          rating: 5
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.author).toBe('Jane Doe');
      expect(res.body.data.rating).toBe(5);
      testimonialId = res.body.data._id;
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .send({ content: 'Fail', author: 'Nobody' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/testimonials/my', () => {
    it('should return user testimonials', async () => {
      const res = await request(app)
        .get('/api/testimonials/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/testimonials/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/testimonials/portfolio/:portfolioId', () => {
    it('should return testimonials for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/testimonials/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/testimonials/:testimonialId', () => {
    it('should return a single testimonial', async () => {
      const res = await request(app)
        .get(`/api/testimonials/${testimonialId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.author).toBe('Jane Doe');
    });

    it('should return 404 for non-existent testimonial', async () => {
      const res = await request(app)
        .get('/api/testimonials/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/testimonials/:testimonialId', () => {
    it('should update a testimonial', async () => {
      const res = await request(app)
        .put(`/api/testimonials/${testimonialId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ content: 'Updated review: Outstanding work!', rating: 4 });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.content).toBe('Updated review: Outstanding work!');
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/testimonials/${testimonialId}`)
        .send({ content: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/testimonials/:testimonialId', () => {
    it('should delete a testimonial', async () => {
      const res = await request(app)
        .delete(`/api/testimonials/${testimonialId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Testimonial deleted successfully');
    });

    it('should verify testimonial is deleted', async () => {
      const res = await request(app)
        .get(`/api/testimonials/${testimonialId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
