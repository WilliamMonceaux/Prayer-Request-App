import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Validates the current session and returns the logged-in user's data.
 * Useful for keeping the user logged in across page refreshes.
 */

export async function GET() {
  try {
    await connectMongo();

    // Retrieve the JWT from the browser cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // If no token exists, the user is unauthenticated
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify the token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // This confirms the token was created by our server and hasn't been tampered with

    // Fetch user data from MongoDB using the ID stored in the token
    const user = await User.findById(decoded.userId).select('-password'); // used .select('-password') to ensure we NEVER send the hashed password back to the frontend

    // Handle cases where the token is valid but the user no longer exists in the DB
    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // Return the user object to the frontend
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    // If the token is expired or invalid, jwt.verify will throw an error
    console.error('Auth Me Error:', err.message);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
