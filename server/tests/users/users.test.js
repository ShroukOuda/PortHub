const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const { hashPassword } = require('../../utils/hash');

describe('Users API', () => {
  let adminToken;
  let userToken;
  let testUserId;

  const adminUser = {
    firstName: 'Admin',
    lastName: 'Tester',
    username: 'admintester',
    email: 'admintester@example.com',
    phone: '1111111111',
    password: 'AdminPass123!',
    gender: 'other',
    dateOfBirth: '1990-01-01',
    country: 'Egypt',
    city: 'Cairo',
    address: '1 Admin St',
    role: 'admin'
  };

  const regularUser = {
    firstName: 'Regular',
    lastName: 'User',
    username: 'regularuser',
    email: 'regularuser@example.com',
    phone: '2222222222',
    password: 'UserPass123!',
    gender: 'male',
    dateOfBirth: '1995-06-15',
    country: 'Jordan',
    city: 'Amman',
    address: '2 User Ave',
    role: 'user'
  };

  beforeAll(async () => {
    // Clean up
    await User.deleteMany({
      email: { $in: [adminUser.email, regularUser.email] }
    });

    // Create admin
    const adminHash = await hashPassword(adminUser.password);
    await User.create({ ...adminUser, password: adminHash });

    // Create regular user
    const userHash = await hashPassword(regularUser.password);
    const created = await User.create({ ...regularUser, password: userHash });
    testUserId = created._id.toString();

    // Login as admin
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ login: adminUser.email, password: adminUser.password });
    adminToken = adminRes.body.accessToken;

    // Login as user
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ login: regularUser.email, password: regularUser.password });
    userToken = userRes.body.accessToken;
  });

  describe('GET /api/users/stats', () => {
    it('should return public stats without auth', async () => {
      const res = await request(app).get('/api/users/stats');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('totalUsers');
      expect(res.body).toHaveProperty('totalPortfolios');
      expect(res.body).toHaveProperty('totalCountries');
      expect(res.body).toHaveProperty('countryCounts');
      expect(Array.isArray(res.body.countryCounts)).toBe(true);
    });
  });

  describe('GET /api/users/public', () => {
    it('should return users with public portfolios', async () => {
      const res = await request(app).get('/api/users/public');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
      const res = await request(app).get(`/api/users/${testUserId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(regularUser.email);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app).get('/api/users/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /api/users/me', () => {
    it('should return current user profile', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(regularUser.email);
    });

    it('should fail without auth token', async () => {
      const res = await request(app).get('/api/users/me');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /api/users/me', () => {
    it('should update own profile', async () => {
      const res = await request(app)
        .put('/api/users/me')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ bio: 'Updated bio', jobTitle: 'Developer' });
      expect(res.statusCode).toBe(200);
      expect(res.body.user.bio).toBe('Updated bio');
      expect(res.body.user.jobTitle).toBe('Developer');
    });

    it('should fail without auth token', async () => {
      const res = await request(app)
        .put('/api/users/me')
        .send({ bio: 'Should fail' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/users/ (admin)', () => {
    it('should return all users for admin', async () => {
      const res = await request(app)
        .get('/api/users/')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should reject non-admin', async () => {
      const res = await request(app)
        .get('/api/users/')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('PUT /api/users/:id (admin)', () => {
    it('should update user as admin', async () => {
      const res = await request(app)
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ firstName: 'UpdatedName' });
      expect(res.statusCode).toBe(200);
      expect(res.body.user.firstName).toBe('UpdatedName');
    });

    it('should reject non-admin', async () => {
      const res = await request(app)
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ firstName: 'Hacked' });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('PUT /api/users/me/password', () => {
    it('should change password with correct current password', async () => {
      const res = await request(app)
        .put('/api/users/me/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ currentPassword: regularUser.password, newPassword: 'NewPass123!' });
      expect(res.statusCode).toBe(200);

      // Restore original password for other tests
      await request(app)
        .put('/api/users/me/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ currentPassword: 'NewPass123!', newPassword: regularUser.password });
    });

    it('should fail with wrong current password', async () => {
      const res = await request(app)
        .put('/api/users/me/password')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ currentPassword: 'WrongPass1!', newPassword: 'NewPass123!' });
      expect(res.statusCode).toBe(400);
    });
  });
});
