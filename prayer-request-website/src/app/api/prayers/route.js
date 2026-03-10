import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

const durationMap = {
  '1 Week': 7,
  '2 Weeks': 14,
  '1 Month': 30,
};

export async function GET() {
  try {
    await connectMongo();
    const timeNow = new Date();

    const prayers = await PrayerPost.find({
      expiresAt: { $gt: timeNow },
    })
      .populate('user_id', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(prayers, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch prayers' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();

    if (!data.title || !data.description || !data.duration || !data.user_id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const expirationDate = new Date();

    if (data.duration === '1 Minute') {
      expirationDate.setMinutes(expirationDate.getMinutes() + 1);
    } else {
      const daysToAdd = durationMap[data.duration] || 7;
      expirationDate.setDate(expirationDate.getDate() + daysToAdd);
    }

    const newPost = await PrayerPost.create({
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      expiresAt: expirationDate,
      isAnonymous: data.isAnonymous || false,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to post prayer' }, { status: 500 });
  }
}
