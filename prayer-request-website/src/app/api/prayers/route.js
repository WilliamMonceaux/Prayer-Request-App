import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongo();
    const prayers = await PrayerPost.find({}).sort({ createdAt: -1 });
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

    const newPost = await PrayerPost.create({
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      isAnonymous: data.isAnonymous || false,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: 'Failed to post prayer' }, { status: 500 });
  }
}
