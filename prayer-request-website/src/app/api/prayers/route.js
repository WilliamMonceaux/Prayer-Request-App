import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

const durationMap = {
  '1 Week': 7,
  '2 Weeks': 14,
  '1 Month': 30,
};

export async function GET(req) {
  try {
    await connectMongo();
    const timeNow = new Date();

    const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;

    const status = searchParams.get('status');

    const skip = (page - 1) * limit;

    let query = { expiresAt: { $gt: timeNow } };

    if (status && status !== 'all') {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    const [prayers, totalCount] = await Promise.all([
      PrayerPost.find(query)
        .populate('user_id', 'username profilePicture')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      PrayerPost.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        prayers,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET error:', err);
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
