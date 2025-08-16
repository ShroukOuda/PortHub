const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        email: 'testuser@example.com',
        phone: '1234567890',
        password: 'password123',
        profilePicture: 'test-profile.png',
        bio: 'This is a test user.',
        gender: 'other',
        dateOfBirth: '2000-01-01',
        country: 'Testland',
        city: 'Test City',
        address: '123 Test St',
        role: 'user'
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);

   expect(response.statusCode).toBe(201);
   expect(response.body.message).toBe('User registered successfully');

  });
});

