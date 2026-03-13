import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error('Please give a valid environment uri variable');
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
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
