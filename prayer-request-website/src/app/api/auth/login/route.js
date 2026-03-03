import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongo();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: { email: user.email, username: user.username },
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true, // Interrupts hackers from stealing information in JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // internal reminder: 1 day
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login Error:', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
