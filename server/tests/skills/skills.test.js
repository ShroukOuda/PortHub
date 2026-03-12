const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Skill = require('../../models/Skill');
const { hashPassword } = require('../../utils/hash');

describe('Skills API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let skillId;

  const testUser = {
    firstName: 'Skill',
    lastName: 'Tester',
    username: 'skilltester',
    email: 'skilltester@example.com',
    phone: '5555555555',
    password: 'SkillPass123!',
    gender: 'male',
    dateOfBirth: '1994-02-14',
    country: 'Palestine',
    city: 'Gaza',
    address: '5 Skill St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Skill.deleteMany({ portfolioId: existingPortfolio._id });
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
      .send({ title: 'Skill Portfolio', About: 'Testing skills API endpoint' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/skills', () => {
    it('should create a skill', async () => {
      const res = await request(app)
        .post('/api/skills')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'JavaScript',
          level: 90,
          category: 'Technical'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe('JavaScript');
      skillId = res.body.data._id;
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/skills')
        .send({ name: 'Fail Skill', level: 50 });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/skills/my', () => {
    it('should return user skills', async () => {
      const res = await request(app)
        .get('/api/skills/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/skills/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/skills/portfolio/:portfolioId', () => {
    it('should return skills for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/skills/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/skills/:skillId', () => {
    it('should return a single skill', async () => {
      const res = await request(app)
        .get(`/api/skills/${skillId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('JavaScript');
    });

    it('should return 404 for non-existent skill', async () => {
      const res = await request(app)
        .get('/api/skills/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/skills/:skillId', () => {
    it('should update a skill', async () => {
      const res = await request(app)
        .put(`/api/skills/${skillId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'TypeScript', level: 85 });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe('TypeScript');
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/skills/${skillId}`)
        .send({ name: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/skills/:skillId', () => {
    it('should delete a skill', async () => {
      const res = await request(app)
        .delete(`/api/skills/${skillId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Skill deleted successfully');
    });

    it('should verify skill is deleted', async () => {
      const res = await request(app)
        .get(`/api/skills/${skillId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
