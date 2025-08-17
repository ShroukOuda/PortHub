const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

jest.setTimeout(20000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
