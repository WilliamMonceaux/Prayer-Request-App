import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await connectMongo();
        const { id } = await params;

        const deletedPrayer = await PrayerPost.findByIdAndDelete(id);

        if(!deletedPrayer) {
            return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Prayer deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error('DELETE error:', err);
        return NextResponse.json({ error: 'Failed to delete prayer'}, { status: 500 });
    }
}