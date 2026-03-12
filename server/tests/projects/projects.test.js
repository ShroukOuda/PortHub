const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const Project = require('../../models/Project');
const { hashPassword } = require('../../utils/hash');

describe('Projects API', () => {
  let userToken;
  let userId;
  let portfolioId;
  let projectId;

  const testUser = {
    firstName: 'Project',
    lastName: 'Tester',
    username: 'projecttester',
    email: 'projecttester@example.com',
    phone: '2222222222',
    password: 'ProjPass123!',
    gender: 'male',
    dateOfBirth: '1993-04-10',
    country: 'Palestine',
    city: 'Gaza',
    address: '2 Proj St',
    role: 'user'
  };

  beforeAll(async () => {
    const existing = await User.findOne({ email: testUser.email });
    if (existing) {
      const existingPortfolio = await Portfolio.findOne({ userId: existing._id });
      if (existingPortfolio) {
        await Project.deleteMany({ portfolioId: existingPortfolio._id });
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
      .send({ title: 'Proj Portfolio', About: 'Testing projects API' });
    portfolioId = portfolioRes.body.data?._id || portfolioRes.body._id;
  });

  describe('POST /api/projects', () => {
    it('should create a project', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'PortHub',
          description: 'A portfolio builder application',
          technologies: ['Angular', 'Node.js', 'MongoDB'],
          demoUrl: 'https://porthub.example.com',
          githubUrl: 'https://github.com/example/porthub'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('PortHub');
      projectId = res.body.data._id;
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({ title: 'Fail Project', description: 'Should fail' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/projects/my', () => {
    it('should return user projects', async () => {
      const res = await request(app)
        .get('/api/projects/my')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail without auth', async () => {
      const res = await request(app).get('/api/projects/my');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/projects/portfolio/:portfolioId', () => {
    it('should return projects for a portfolio', async () => {
      const res = await request(app)
        .get(`/api/projects/portfolio/${portfolioId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/projects/:projectId', () => {
    it('should return a single project', async () => {
      const res = await request(app)
        .get(`/api/projects/${projectId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('PortHub');
    });

    it('should return 404 for non-existent project', async () => {
      const res = await request(app)
        .get('/api/projects/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/projects/:projectId', () => {
    it('should update a project', async () => {
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'PortHub v2', description: 'Updated portfolio builder' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('PortHub v2');
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .send({ title: 'Hacked' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/projects/:projectId', () => {
    it('should delete a project', async () => {
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Project deleted successfully');
    });

    it('should verify project is deleted', async () => {
      const res = await request(app)
        .get(`/api/projects/${projectId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
