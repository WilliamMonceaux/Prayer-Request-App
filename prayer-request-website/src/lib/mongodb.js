import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please give a valid environment uri variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('Starting new MongoDB connection...');
    cached.promise = mongoose.connect(MONGO_URI).then((m) => {
      console.log('Successfully connected to MongoDB');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.conn = null;
    console.error('Failed to connect to MongoDB');
    throw err;
  }
  return cached.conn;
}

export { connectMongo };
