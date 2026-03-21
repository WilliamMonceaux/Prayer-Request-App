import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

/**
 * GET Handler: Fetches all registered users
 */

export async function GET() {
  try {
    // Establish database connection
    await connectMongo();
    // Fetch all users from the database
    // .select('-password -__v') is a security measure to exclude the hashed password 
    // and the MongoDB version key from the results.
    // .sort({ createdAt: -1 }) ensures the newest users appear at the top.
    const users = await User.find({}).select('-password -__v').sort({ createdAt: -1 });
    // Return the list of users with a 200 (Success) status
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    // Handle server or database connection errors
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

/**
 * POST Handler: Registers a new user account
 */

export async function POST(req) {
    try {
        await connectMongo();
        // Parse the incoming request body to get registration details
        const { username, email, password } = await req.json();

        // VALIDATION: Ensure all required fields were filled out
        if(!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // DUPLICATE CHECK: Look for an existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        // CREATE: Add the new user to the database
        // The 'role' is defaulted to 'user' for security
        const newUser = await User.create({
            username,
            email,
            password,
            role: 'user'
        });

        // CLEANUP: Convert the Mongoose document to a plain object
        // This allows us to send the user data back without internal Mongoose methods
        const userResponse = newUser.toObject();

        return NextResponse.json(userResponse, { status: 201 });
    } catch (err) {
        // Handle validation errors or unique constraint violations
        console.error('POST error:', err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}