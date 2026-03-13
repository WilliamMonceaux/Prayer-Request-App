import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectMongo();
  const { id } = await params;
  const user = await User.findById(id).select('-password');
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const prayers = await PrayerPost.find({ user_id: id }).sort({ createdAt: -1 });
  return NextResponse.json({ user, prayers, stats: { totalPrayers: prayers.length } });
}
