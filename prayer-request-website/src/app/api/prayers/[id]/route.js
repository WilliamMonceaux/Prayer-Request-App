import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;

    const deletedPrayer = await PrayerPost.findByIdAndDelete(id);

    if (!deletedPrayer) {
      return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Prayer deleted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete prayer' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectMongo();

    const { id } = await params;
    const data = await req.json();

    const updatedPrayer = await PrayerPost.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedPrayer) {
      return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPrayer, { status: 200 });
  } catch (err) {
    console.error('PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update prayer' }, { status: 500 });
  }
}
