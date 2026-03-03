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
      isAnonymous: false,
    };

    const prayer = new PrayerPost(validPrayer);
    const savedPrayer = await prayer.save();

    expect(savedPrayer._id).toBeDefined();
    expect(savedPrayer.status).toBe('Need Prayers');
    expect(savedPrayer.isAnonymous).toBe(false);
  });

  it('should fail if duration is not in the allowed enum list', async () => {
    const invalidPrayer = new PrayerPost({
      user_id: new mongoose.Types.ObjectId(),
      title: 'Invalid Duration',
      description: 'test description',
      duration: 'eternity',
    });

    let err;
    try {
      await invalidPrayer.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.duration.message).toBe('Please select a valid duration');
  });

  it('should fail if description exceeds 1000 characters', async () => {
    const longDescription = 'a'.repeat(1001);
    const tooLongPrayer = new PrayerPost({
      user_id: new mongoose.Types.ObjectId(),
      title: 'Long Post',
      description: longDescription,
      duration: '1 day',
    });

    await expect(tooLongPrayer.save()).rejects.toThrow(/Exceeded 1000 characters/);
  });

  it('should fail if user_id is missing', async () => {
    const orphanedPrayer = new PrayerPost({
      title: 'No User',
      description: 'Missing user_id',
      duration: '1 day',
    });

    await expect(orphanedPrayer.save()).rejects.toThrow(
      /A prayer must belong to a user/
    );
  });

  it('should fail if title is missing', async () => {
    const noTitlePrayer = new PrayerPost({
      user_id: new mongoose.Types.ObjectId(),
      description: 'Missing title',
      duration: '1 day',
    });

    await expect(noTitlePrayer.save()).rejects.toThrow(/Title is required/);
  });
});
