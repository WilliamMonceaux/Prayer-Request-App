import { connectMongo } from '@/lib/mongodb';
import { PrayerPost } from '@/models/PrayerPost';
import { NextResponse } from 'next/server';

// A helper object to convert user-friendly strings into actual days for math
const durationMap = {
  '1 Week': 7,
  '2 Weeks': 14,
  '1 Month': 30,
};

/**
 * GET Handler: Fetches a list of active prayer requests with pagination
 */

export async function GET(req) {
  try {
    await connectMongo();
    const timeNow = new Date();

   // Parse query parameters from the URL (e.g., /api/prayers?page=2&limit=5)
    const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`);
    const page = parseInt(searchParams.get('page')) || 1; // Defaults to 1
    const limit = parseInt(searchParams.get('limit')) || 5; // Show 5 posts at a time
    const status = searchParams.get('status');

    // Pagination Math: If we are on page 2 with a limit of 5, we 'skip' the first 5 posts
    const skip = (page - 1) * limit;

    // Define the Query: Only find posts where the expiration date is in the future ($gt: greater than)
    let query = { expiresAt: { $gt: timeNow } };

    // Optional Filtering: If a user searches by status (e.g., 'answered'), add it to the query
    if (status && status !== 'all') {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    // Parallel Execution: Run the data fetch and the total count at the same time for better speed
    const [prayers, totalCount] = await Promise.all([
      PrayerPost.find(query)
        .populate('user_id', 'username profilePicture') // Get author details
        .sort({ createdAt: -1 }) // Show newest first
        .skip(skip) // Skip previous pages
        .limit(limit), // Limit the amount returned
      PrayerPost.countDocuments(query), // Count total posts for the pagination UI
    ]);

    // Calculate how many total pages exist
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

/**
 * POST Handler: Creates a new prayer request with an automatic expiration date
 */

export async function POST(req) {
  try {
    await connectMongo();
    const data = await req.json();

    // Validation: Ensure required fields are present
    if (!data.title || !data.description || !data.duration || !data.user_id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Calculate Expiration: Start with "Now"
    const expirationDate = new Date();

    // Custom duration logic: Adds time to the current date based on user selection
    if (data.duration === '1 Minute') {
      expirationDate.setMinutes(expirationDate.getMinutes() + 1); // Great for testing!
    } else {
      const daysToAdd = durationMap[data.duration] || 7; // Default to 1 week if not specified
      expirationDate.setDate(expirationDate.getDate() + daysToAdd);
    }

    // Create the document in MongoDB
    const newPost = await PrayerPost.create({
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      expiresAt: expirationDate, // Store the calculated end date
      isAnonymous: data.isAnonymous || false,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to post prayer' }, { status: 500 });
  }
}
