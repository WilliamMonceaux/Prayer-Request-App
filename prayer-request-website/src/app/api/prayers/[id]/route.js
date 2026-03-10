import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';
import { Like } from '@/models/Like';

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;

    const body = await req.json();
    const { user_id } = body;

    const prayer = await PrayerPost.findById(id);
    if (!prayer) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    if (prayer.user_id.toString() !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await PrayerPost.findByIdAndDelete(id);

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
    const body = await req.json();
    const { user_id, action } = body;

    if (action === 'togglePray') {
      const prayer = await PrayerPost.findById(id);
      if (!prayer) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

      if (prayer.user_id.toString() === user_id) {
    return NextResponse.json(
      { error: "You cannot pray for your own request." }, 
      { status: 400 }
    );
  }

      const existingLike = await Like.findOne({ user_id: user_id, prayer_id: id });
      let updated;

      if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);

        updated = await PrayerPost.findOneAndUpdate(
          { _id: id, prayedCount: { $gt: 0 } },
          { $inc: { prayedCount: -1 } },
          { new: true }
        ).populate('user_id', 'username profilePicture');

        if (!updated) {
          updated = await PrayerPost.findById(id).populate(
            'user_id',
            'username profilePicture'
          );
        }
      } else {
        await Like.create({ user_id: user_id, prayer_id: id });
        updated = await PrayerPost.findByIdAndUpdate(
          id,
          { $inc: { prayedCount: 1 } },
          { new: true }
        ).populate('user_id', 'username profilePicture');
      }

      return NextResponse.json(updated, { status: 200 });
    }

    const prayer = await PrayerPost.findById(id);
    if (!prayer) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    if (prayer.user_id.toString() !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedPrayer = await PrayerPost.findByIdAndUpdate(
      id,
      { $set: body.editData },
      { new: true, runValidators: true }
    ).populate('user_id', 'username profilePicture');

    return NextResponse.json(updatedPrayer, { status: 200 });
  } catch (err) {
    console.error('DETAILED API ERROR:', err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
