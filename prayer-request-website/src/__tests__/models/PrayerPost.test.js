import mongoose from 'mongoose';
const { MongoMemoryServer } = require('mongodb-memory-server');
const { PrayerPost } = require('../../models/PrayerPost');

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
    await PrayerPost.deleteMany({});
});

describe('PrayerPost Model Unit Tests', () => {
    it('should create a valid prayer post successfully', async () => {
        const validPrayer = {
            user_id: new mongoose.Types.ObjectId(),
            title: 'Healing for my Grandmother',
            description: 'She is recovering from surgery and needs prayers!',
            duration: '1 week',
            isAnonymous: false
        };

        const prayer = new PrayerPost(validPrayer);
        const savedPrayer = await prayer.save();

        expect(savedPrayer._id).toBeDefined();
        expect(savedPrayer.status).toBe('Need Prayers');
        expect(savedPrayer.isAnonymous).toBe(false);
    });
})