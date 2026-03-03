import { POST } from '../../app/api/auth/signup/route';
import { User } from '../../models/User';
import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';
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

describe('Signup API Integration', () => {
    it('successfully registers a user', async () => {
        const { req } = createMocks({
            method: 'POST',
            json: async () => ({
                username: 'Larry',
                email: 'Larry@hotmail.com',
                password: 'Password123'
            }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.message).toBe('User registered!');

        const userInDb = await User.findOne({ email: 'Larry@hotmail.com' });
        expect(userInDb).toBeTruthy();
        expect(userInDb.username).toBe('Larry');
    });
});