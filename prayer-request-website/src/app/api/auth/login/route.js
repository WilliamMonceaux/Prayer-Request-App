import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongo();

    // Parse request body for user credentials
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

     // Check if user exists in the database
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare incoming plaintext password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a JSON Web Token (JWT) for session management
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Construct the success response with limited user data
    const response = NextResponse.json(
      {
        message: 'Signin successful',
        user: {
          email: user.email,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      },
      { status: 200 }
    );

    // Securely attach the JWT to an HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents client-side JS from accessing the token (XSS protection)
      secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in production
      sameSite: 'lax', // Protects against CSRF attacks
      maxAge: 60 * 60 * 24, // internal reminder: 1 day expiration for JWT
      path: '/',
    });

    return response;
  } catch (err) {
    // Log internal errors and return a 500 status to the client
    console.error('Login Error:', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
