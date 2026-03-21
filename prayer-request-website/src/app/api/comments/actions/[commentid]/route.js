import { connectMongo } from '@/lib/mongodb';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

/**
 * DELETE Handler: Removes a specific comment from the database
 */

export async function DELETE(req, { params }) {
  try {
    // Establish a connection to the MongoDB database
    await connectMongo();

    // Extract the 'commentid' from the URL parameters
    const { commentid } = await params;

    // Attempt to find the specific comment by its ID and remove it in one step
    // The 'deletedComment' variable will hold the data of the comment that WAS removed
    const deletedComment = await Comment.findByIdAndDelete(commentid);

    // Validation: If Mongoose couldn't find a comment with that ID,
    // send a 404 (Not Found) response back to the user
    if (!deletedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Success: Send a confirmation message back to the frontend
    return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
  } catch (err) {
    // Error Handling: Catch network issues or database crashes
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
