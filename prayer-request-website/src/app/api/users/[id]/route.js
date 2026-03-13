import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const prayerCount = await PrayerPost.find({ user_id: id }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        user,
        prayers: prayerCount,
        stats: {
          totalPrayers: prayerCount.length,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Dashboard error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectMongo();

    const { id } = await params;
    const data = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error('PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
