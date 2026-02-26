import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please give a valid environment uri variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null};
}

async function connectMongo() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log('Starting new MongoDB connection...')
        cached.promise = mongoose.connect(MONGO_URI)
        .then((m) => m);

        try {
            cached.conn = await cached.promise;
            console.log('Successfully connected to MongoDB');
        } catch (err) {
            cached.conn = null;
            console.error('Failed to connect to MongoDB');
            throw err
        }
        return cached.conn;
    }
    return mongoose.connect(MONGO_URI);
}

export { connectMongo };