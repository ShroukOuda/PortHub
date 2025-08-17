const request = require('supertest');
const app = require('../../app');
const userModel = require('../../models/User');
const { hashPassword } = require('../../utils/hash');

describe('Login API', () => {
  const testUser = {
    firstName: 'Login',
    lastName: 'User',
    username: 'loginuser',
    email: 'loginuser@example.com',
    phone: '1234567890',
    password: 'Password123!',
    gender: 'other',
    dateOfBirth: '2000-01-01',
    country: 'Testland',
    city: 'Test City',
    address: '123 Test St',
    role: 'user'
  };

  beforeAll(async () => {
    const hashedPassword = await hashPassword(testUser.password);

    await userModel.deleteMany({ $or: [{ email: testUser.email }, { username: testUser.username }] });

    await userModel.create({ ...testUser, password: hashedPassword });
  });

  it('should login successfully with email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(testUser.username);
  });

  it('should login successfully with username', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.username, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.accessToken).toBeDefined();
  });

  it('should fail if login or password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ login: '', password: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('email and password are required');
  });

  it('should fail if user does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ login: 'nonexistent@example.com', password: 'Password123!' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });

  it('should fail if password is incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ login: testUser.email, password: 'WrongPassword1!' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
    expect(res.body.accessToken).toBeNull();
  });
});
