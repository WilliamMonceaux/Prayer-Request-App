const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User } = require('../../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
})

describe('User Model Validation', () => {
  it('should create a valid user successfully', async () => {
    const validUser = {
      username: 'TestUser',
      email: 'test@gmail.com',
      password: 'password123',
    };

    const newUser = new User(validUser);
    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(validUser.username);
    expect(savedUser.role).toBe('user');
  });

  it('should fail if email is formatted incorrectly', async () => {
    const invalidUser = new User({
      username: 'Test',
      email: 'not email',
      password: 'password123',
    });

    let err;
    try {
      await invalidUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.email.message).toBe('Please us a valid email address');
  });

  it('should fail if password is shorter than 6 characters', async () => {
    const shortPasswordUser = new User({
      username: 'Test',
      email: 'test2@example.com',
      password: '123',
    });

    let err;
    try {
      await shortPasswordUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.password.message).toBe('Password must be at least 6 characters');
  });
});
