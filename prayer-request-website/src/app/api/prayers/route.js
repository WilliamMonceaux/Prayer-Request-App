import { connectMongo } from '@/lib/mongodb';
import Prayer from '@/models/Prayerpost';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectMongo();
        const prayers = await Prayer.find({}).sort({ createdAt: -1 });
        return NextResponse.json(prayers, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch prayers'}, { status: 500 })
    }
}