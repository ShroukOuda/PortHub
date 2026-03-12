const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Certificate = require('../../models/Certificate');
const { hashPassword } = require('../../utils/hash');

describe('Certificates API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let certificateId;

  const testUser = {
    firstName: 'Cert',
    lastName: 'Tester',
    username: 'certtester',
    email: 'certtester@example.com',
    phone: '1111111111',
    password: 'CertPass123!',
    gender: 'female',
    dateOfBirth: '1995-06-15',
    country: 'Palestine',
    city: 'Gaza',
    address: '1 Cert St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Certificate.deleteMany({ portfolioId: existingPortfolio._id });
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

    // Create a portfolio for this user
    const portfolioRes = await request(app)
      .post('/api/portfolios')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Cert Portfolio', About: 'Testing certificates API' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/certificates', () => {
    it('should create a certificate', async () => {
      const res = await request(app)
        .post('/api/certificates')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'AWS Solutions Architect',
          description: 'Amazon Web Services certification',
          issuer: 'Amazon',
          issueDate: '2024-01-15',
          technologies: ['AWS', 'Cloud'],
          credentialId: 'ABC123',
          credentialUrl: 'https://aws.amazon.com/cert/ABC123'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('AWS Solutions Architect');
      certificateId = res.body.data._id;
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/certificates')
        .send({ title: 'Fail Cert', issuer: 'Nobody' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/certificates/my', () => {
    it('should return user certificates', async () => {
      const res = await request(app)
        .get('/api/certificates/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/certificates/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/certificates/portfolio/:portfolioId', () => {
    it('should return certificates for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/certificates/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/certificates/:certificateId', () => {
    it('should return a single certificate', async () => {
      const res = await request(app)
        .get(`/api/certificates/${certificateId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('AWS Solutions Architect');
    });

    it('should return 404 for non-existent certificate', async () => {
      const res = await request(app)
        .get('/api/certificates/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/certificates/:certificateId', () => {
    it('should update a certificate', async () => {
      const res = await request(app)
        .put(`/api/certificates/${certificateId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'AWS Solutions Architect - Associate' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('AWS Solutions Architect - Associate');
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/certificates/${certificateId}`)
        .send({ title: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/certificates/:certificateId', () => {
    it('should delete a certificate', async () => {
      const res = await request(app)
        .delete(`/api/certificates/${certificateId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Certificate deleted successfully');
    });

    it('should verify certificate is deleted', async () => {
      const res = await request(app)
        .get(`/api/certificates/${certificateId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
