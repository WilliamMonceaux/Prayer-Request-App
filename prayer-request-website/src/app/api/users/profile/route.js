import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  try {
    await connectMongo();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await req.json();

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const allowedUpdates = ['username', 'email', 'password'];
    
    Object.keys(data).forEach((key) => {
      if (allowedUpdates.includes(key) && data[key]?.trim() !== '') {
        user[key] = data[key];
      }
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Profile Update Error:', err.message);
    return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
  }
}