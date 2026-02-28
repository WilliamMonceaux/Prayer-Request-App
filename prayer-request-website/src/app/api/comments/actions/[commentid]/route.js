import { connectMongo } from '@/lib/mongodb';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { commentid } = await params;

    const deletedComment = await Comment.findByIdAndDelete(commentid);

    if (!deletedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
