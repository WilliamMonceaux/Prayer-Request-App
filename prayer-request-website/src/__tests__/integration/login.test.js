import { POST } from '../../app/api/auth/login/route';
import { User } from '../../models/User';
import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Login API Integration', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('Password123', 10);
    await User.create({
      username: 'Larry',
      email: 'larry@hotmail.com',
      password: hashedPassword,
    });
  });

  it('should login successfully with correct credentials', async () => {
    const { req } = createMocks({
      method: 'POST',
      json: async () => ({
        email: 'larry@hotmail.com',
        password: 'Password123',
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Login successful');
  });
});
