const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const Country = require('../../models/Country');
const { hashPassword } = require('../../utils/hash');

describe('Countries API', () => {
  let adminToken;
  let userToken;
  let countryId;

  const adminUser = {
    firstName: 'Country',
    lastName: 'Admin',
    username: 'countryadmin',
    email: 'countryadmin@example.com',
    phone: '9999999991',
    password: 'AdminPass123!',
    gender: 'male',
    dateOfBirth: '1988-01-01',
    country: 'Palestine',
    city: 'Gaza',
    address: '10 Admin St',
    role: 'admin'
  };

  const regularUser = {
    firstName: 'Country',
    lastName: 'User',
    username: 'countryuser',
    email: 'countryuser@example.com',
    phone: '9999999992',
    password: 'UserPass123!',
    gender: 'female',
    dateOfBirth: '1995-05-05',
    country: 'Palestine',
    city: 'Gaza',
    address: '11 User St',
    role: 'user'
  };

  beforeAll(async () => {
    await User.deleteMany({ email: { $in: [adminUser.email, regularUser.email] } });
    await Country.deleteMany({ name: 'Palestine' });

    const adminHashed = await hashPassword(adminUser.password);
    await User.create({ ...adminUser, password: adminHashed });

    const userHashed = await hashPassword(regularUser.password);
    await User.create({ ...regularUser, password: userHashed });

    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ login: adminUser.email, password: adminUser.password });
    adminToken = adminLogin.body.accessToken;

    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ login: regularUser.email, password: regularUser.password });
    userToken = userLogin.body.accessToken;
  });

  describe('POST /api/countries (admin)', () => {
    it('should create a country', async () => {
      const res = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Palestine', code: 'PS', dialCode: '+970' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Palestine');
      expect(res.body.code).toBe('PS');
      countryId = res.body._id;
    });

    it('should reject duplicate country', async () => {
      const res = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Palestine', code: 'PS', dialCode: '+970' });
      expect(res.statusCode).toBe(409);
    });

    it('should reject missing fields', async () => {
      const res = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Missing Code' });
      expect(res.statusCode).toBe(400);
    });

    it('should fail for regular user', async () => {
      const res = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Unauthorized', code: 'UN', dialCode: '+000' });
      expect(res.statusCode).toBe(403);
    });

    it('should fail without auth', async () => {
      const res = await request(app)
        .post('/api/countries')
        .send({ name: 'No Auth', code: 'NA', dialCode: '+000' });
      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/countries/active (public)', () => {
    it('should return active countries', async () => {
      const res = await request(app).get('/api/countries/active');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/countries (admin)', () => {
    it('should return all countries with pagination', async () => {
      const res = await request(app)
        .get('/api/countries')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should support search by name', async () => {
      const res = await request(app)
        .get('/api/countries?search=Palest')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail for regular user', async () => {
      const res = await request(app)
        .get('/api/countries')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('PUT /api/countries/:id (admin)', () => {
    it('should update a country', async () => {
      const res = await request(app)
        .put(`/api/countries/${countryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'State of Palestine', code: 'PS', dialCode: '+970' });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('State of Palestine');
    });

    it('should return 404 for non-existent', async () => {
      const res = await request(app)
        .put('/api/countries/000000000000000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Ghost', code: 'GH', dialCode: '+000' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PATCH /api/countries/:id/toggle (admin)', () => {
    it('should toggle country active status', async () => {
      const res = await request(app)
        .patch(`/api/countries/${countryId}/toggle`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.isActive).toBe(false);
    });

    it('should toggle back to active', async () => {
      const res = await request(app)
        .patch(`/api/countries/${countryId}/toggle`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.isActive).toBe(true);
    });
  });

  describe('DELETE /api/countries/:id (admin)', () => {
    it('should delete a country', async () => {
      const res = await request(app)
        .delete(`/api/countries/${countryId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Country deleted successfully');
    });

    it('should return 404 for already deleted', async () => {
      const res = await request(app)
        .delete(`/api/countries/${countryId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
