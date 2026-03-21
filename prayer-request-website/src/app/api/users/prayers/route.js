import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * GET Handler: Fetches the logged-in user's private list of prayer requests
 */

export async function GET() {
  try {
    // Establish database connection
    await connectMongo();

    // AUTHENTICATION: Check the browser cookies for a security token
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // SECURITY CHECK: If no token exists, the user isn't logged in
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // DECODE TOKEN: Verify the token is valid and extract the User ID
    // process.env.JWT_SECRET is your secret key stored in the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // FETCH DATA: Find only the prayers belonging to this specific user ID
    // .lean() converts the Mongoose document into a plain JS object (faster & easier to edit)
    const userPrayers = await PrayerPost.find({ user_id: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

      // DYNAMIC COMMENT COUNTING: 
    // Since comment numbers change often, we calculate the 'live' count for each post
    const prayersWithRealCounts = await Promise.all(
      userPrayers.map(async (prayer) => {
        try {
          // Count how many documents in the Comment collection match this prayer's ID
          const actualCount = await Comment.countDocuments({ prayer_id: prayer._id });
          // Return the prayer data but add a new 'commentCount' property to it
          return {
            ...prayer,
            commentCount: actualCount,
          };
        } catch (countErr) {
          console.error(`Error counting for ${prayer._id}:`, countErr);
          return { ...prayer, commentCount: 0 }; // Fallback to 0 if counting fails
        }
      })
    );

   // Success: Send the updated list of prayers back to the dashboard
    return NextResponse.json(prayersWithRealCounts, { status: 200 });
  } catch (err) {
    // Error Handling: Handles expired tokens or server crashes
    console.error('Full GET Error:', err);
    return NextResponse.json({ message: 'Server Error', error: err.message }, { status: 500 });
  }
}