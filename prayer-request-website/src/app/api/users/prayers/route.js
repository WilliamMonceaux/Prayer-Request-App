import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
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
    
    const userPrayers = await PrayerPost.find({ user_id: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    const prayersWithRealCounts = await Promise.all(
      userPrayers.map(async (prayer) => {
        try {
          const actualCount = await Comment.countDocuments({ prayer_id: prayer._id });
          return {
            ...prayer,
            commentCount: actualCount,
          };
        } catch (countErr) {
          console.error(`Error counting for ${prayer._id}:`, countErr);
          return { ...prayer, commentCount: 0 };
        }
      })
    );

    return NextResponse.json(prayersWithRealCounts, { status: 200 });
  } catch (err) {
    console.error('Full GET Error:', err);
    return NextResponse.json({ message: 'Server Error', error: err.message }, { status: 500 });
  }
}