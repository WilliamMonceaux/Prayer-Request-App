import { connectMongo } from '@/lib/mongodb';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = await params;
    const comments = await Comment.find({ prayer_id: id })
      .populate('user_id', 'username profilePicture')
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch comments for this post' },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    await connectMongo();

    const { id } = await params;

    const { content, user_id } = await req.json();

    if (!content || !user_id) {
      return NextResponse.json(
        { error: 'Missing content or user_id' },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      content,
      user_id,
      prayer_id: id,
    });

    const populatedComment = await newComment.populate(
      'user_id',
      'username profilePicture'
    );

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (err) {
    console.error('POST Comment error:', err);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
