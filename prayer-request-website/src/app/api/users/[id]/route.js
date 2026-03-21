import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
import { NextResponse } from 'next/server';

/**
 * GET Handler: Retrieves a user's profile and their prayer history
 */
export async function GET(req, { params }) {
  try {
    // Establish database connection
    await connectMongo();

    // Extract the user 'id' from the URL (from the folder [id])
    const { id } = await params;

    // Find the user by their ID
    // It tells MongoDB to return all fields EXCEPT the hashed password.
    const user = await User.findById(id).select('-password');

    // 4. If no user exists with that ID, return a 404 (Not Found)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all prayer requests created by this specific user
    // .sort({ createdAt: -1 }) ensures their most recent requests show up first
    const prayers = await PrayerPost.find({ user_id: id }).sort({ createdAt: -1 });

    // Construct a combined response:
    // - user: The profile information (name, bio, profile picture, etc.)
    // - prayers: The array of posts they've written
    // - stats: Helpful numbers (like total post count) for the profile UI
    return NextResponse.json({ 
      user, 
      prayers, 
      stats: { totalPrayers: prayers.length } 
    });

  } catch (err) {
    // Standard error handling for server/database issues
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}