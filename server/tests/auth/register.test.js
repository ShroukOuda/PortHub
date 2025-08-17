const request = require('supertest');
const app = require('../../app'); 


describe('Register API', () => {
  const validUser = {
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'testuser@example.com',
    phone: '1234567890',
    password: 'Password123!',
    profilePicture: 'test-profile.png',
    bio: 'This is a test user.',
    gender: 'other',
    dateOfBirth: '2000-01-01',
    country: 'Testland',
    city: 'Test City',
    address: '123 Test St',
    role: 'user'
  };


  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should fail if required fields are missing', async () => {
    const { firstName, ...partialUser } = validUser;
    const res = await request(app)
      .post('/api/auth/register')
      .send(partialUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields are required');
  });

  it('should fail with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, email: 'invalidemail' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid email format');
  });

  it('should fail with weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, username: 'weakuser', email: 'weak@example.com', password: '123' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Password must be/);
  });

  it('should fail if email or username already exists', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser);
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email or username already exists');
  });
});
