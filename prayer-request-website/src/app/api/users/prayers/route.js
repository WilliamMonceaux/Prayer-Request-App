import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongo();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userPrayers = await PrayerPost.find({ user: decoded.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json(userPrayers, { status: 200 });
  } catch (err) {
    console.error('Fetch User Prayers Error:', err.message);
    return NextResponse.json({ message: 'Error fetching your prayers' }, { status: 500 });
  }
}