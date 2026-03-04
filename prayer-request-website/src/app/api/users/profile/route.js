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

    const allowedUpdates = ['username', 'email'];
    const updateData = {};

    Object.keys(data).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = data[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Profile Update Error:', err.message);
    return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
  }
}
