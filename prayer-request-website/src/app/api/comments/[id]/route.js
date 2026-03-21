import { connectMongo } from '@/lib/mongodb';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import { PrayerPost } from '@/models/PrayerPost';

/**
 * GET Handler: Fetches all comments for a specific Prayer Post
 */

export async function GET(req, { params }) {
  try {
    // Establish connection to your MongoDB database
    await connectMongo();

    // Extract the 'id' of the prayer post from the URL parameters
    const { id } = await params;
    // Find all comments that belong to this specific prayer_id
    const comments = await Comment.find({ prayer_id: id })
      // 'populate' fetches the user details (username and picture) from the User collection
      // rather than just showing a random ID string.
      .populate('user_id', 'username profilePicture')
      // Sort the results so the newest comments appear at the top (-1)
      .sort({ createdAt: -1 });

    // Send the list of comments back to the frontend with a 200 (Success) status
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    // If something breaks (e.g., DB is down), send a 500 error
    return NextResponse.json(
      { error: 'Failed to fetch comments for this post' },
      { status: 500 }
    );
  }
}

/**
 * POST Handler: Creates a new comment on a Prayer Post
 */

export async function POST(req, { params }) {
  try {
    await connectMongo();

    // Get the 'id' of the post being commented on from the URL
    const { id } = await params;

    // Parse the body of the request to get the comment text and who wrote it
    const { content, user_id } = await req.json();

    // Validation: Stop the process if the user didn't write anything
    if (!content || !user_id) {
      return NextResponse.json(
        { error: 'Missing content or user_id' },
        { status: 400 }
      );
    }

    // Create the new comment entry in the database
    const newComment = await Comment.create({
      content,
      user_id,
      prayer_id: id, // Link the comment to the specific post
    });

    // Update the original PrayerPost: Add this new comment's ID to its list
    // This keeps the Post and its Comments "connected" in both directions.
    await PrayerPost.findByIdAndUpdate(id, {
      $push: { comment_id: newComment._id },
    });

    // Populate the user info for the newly created comment
    // This allows the frontend to show the user's name immediately after they post.
    const populatedComment = await newComment.populate(
      'user_id',
      'username profilePicture'
    );

    // Return the new comment with a 201 (Created) status
    return NextResponse.json(populatedComment, { status: 201 });
  } catch (err) {
    console.error('POST Comment error:', err);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
