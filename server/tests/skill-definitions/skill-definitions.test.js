const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const SkillDefinition = require('../../models/SkillDefinition');
const { hashPassword } = require('../../utils/hash');

describe('Skill Definitions API', () => {
  let adminToken;
  let userToken;
  let skillId;

  beforeAll(async () => {
    await User.deleteMany({
      email: { $in: ['skilladmin@example.com', 'skilluser@example.com'] }
    });
    await SkillDefinition.deleteMany({ name: { $regex: /^TestSkill/ } });

    // Create admin
    const adminHash = await hashPassword('AdminPass123!');
    await User.create({
      firstName: 'Skill', lastName: 'Admin', username: 'skilladmin',
      email: 'skilladmin@example.com', phone: '4444444444',
      password: adminHash, gender: 'other', dateOfBirth: '1990-01-01',
      country: 'Egypt', city: 'Cairo', address: 'Admin St', role: 'admin'
    });

    // Create regular user
    const userHash = await hashPassword('UserPass123!');
    await User.create({
      firstName: 'Skill', lastName: 'User', username: 'skilluser',
      email: 'skilluser@example.com', phone: '5555555555',
      password: userHash, gender: 'other', dateOfBirth: '1990-01-01',
      country: 'Jordan', city: 'Amman', address: 'User St', role: 'user'
    });

    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ login: 'skilladmin@example.com', password: 'AdminPass123!' });
    adminToken = adminRes.body.accessToken;

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ login: 'skilluser@example.com', password: 'UserPass123!' });
    userToken = userRes.body.accessToken;
  });

  describe('POST /api/skill-definitions (admin)', () => {
    it('should create a skill definition', async () => {
      const res = await request(app)
        .post('/api/skill-definitions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'TestSkill_React', category: 'Frontend' });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe('TestSkill_React');
      expect(res.body.data.category).toBe('Frontend');
      skillId = res.body.data._id;
    });

    it('should reject duplicate skill name', async () => {
      const res = await request(app)
        .post('/api/skill-definitions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'TestSkill_React', category: 'Frontend' });
      expect(res.statusCode).toBe(409);
    });

    it('should reject non-admin', async () => {
      const res = await request(app)
        .post('/api/skill-definitions')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'TestSkill_Hacked', category: 'Hacking' });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('GET /api/skill-definitions (public)', () => {
    it('should return all active skill definitions', async () => {
      const res = await request(app).get('/api/skill-definitions');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.some(s => s.name === 'TestSkill_React')).toBe(true);
    });
  });

  describe('GET /api/skill-definitions/categories', () => {
    it('should return distinct categories', async () => {
      const res = await request(app).get('/api/skill-definitions/categories');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toContain('Frontend');
    });
  });

  describe('PUT /api/skill-definitions/:id (admin)', () => {
    it('should update a skill definition', async () => {
      const res = await request(app)
        .put(`/api/skill-definitions/${skillId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'TestSkill_ReactJS', category: 'Frontend' });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe('TestSkill_ReactJS');
    });

    it('should reject non-admin', async () => {
      const res = await request(app)
        .put(`/api/skill-definitions/${skillId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Hacked' });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('DELETE /api/skill-definitions/:id (admin)', () => {
    it('should delete a skill definition', async () => {
      const res = await request(app)
        .delete(`/api/skill-definitions/${skillId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });

    it('should reject non-admin', async () => {
      // Create another to test delete rejection
      const createRes = await request(app)
        .post('/api/skill-definitions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'TestSkill_ToDelete', category: 'Test' });

      const res = await request(app)
        .delete(`/api/skill-definitions/${createRes.body.data._id}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(403);

      // Clean up
      await request(app)
        .delete(`/api/skill-definitions/${createRes.body.data._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
    });
  });
});
