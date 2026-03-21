import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { PrayerPost } from '@/models/PrayerPost';
import { Comment } from '@/models/Comment';
import { Like } from '@/models/Like';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { uploadToS3 } from '@/lib/s3';

/**
 * PATCH Handler: Updates user profile details and profile picture
 */

export async function PATCH(req) {
  try {
    await connectMongo();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // AUTH CHECK: Ensure the user is logged in via JWT
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // FORM DATA: Since we are uploading a file (image), we use formData instead of json
    const formData = await req.formData();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // IMAGE UPLOAD: Check if a new profile picture was provided
    const file = formData.get('profilePicture');
    if (file && typeof file !== 'string' && file.size > 0) {
      // Convert file to a Buffer for S3 processing
      const buffer = Buffer.from(await file.arrayBuffer());
      // Upload to AWS S3 and get the public URL back
      const s3Url = await uploadToS3(buffer, file.name, file.type);
      user.profilePicture = s3Url; // Update user object with new URL
    }

    // FIELD UPDATES: Loop through allowed fields and update if they have values
    const allowedUpdates = ['username', 'email', 'password'];
    allowedUpdates.forEach((key) => {
      const value = formData.get(key);
      if (value && typeof value === 'string' && value.trim() !== '') {
        user[key] = value;
      }
    });

    // SAVE: Mongoose 'save' will trigger any password hashing middleware you have set up
    await user.save();

    // RESPONSE: Clean up the object to hide the password before sending to frontend
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('PATCH ERROR:', err);
    return NextResponse.json(
      { message: 'Update failed', error: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE Handler: Completely removes a user and all their associated data
 */

export async function DELETE(req) {
  try {
    await connectMongo();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // VERIFY SESSION: Ensure the token hasn't expired
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtErr) {
      return NextResponse.json({ message: 'Session expired' }, { status: 401 });
    }

    const userId = decoded.userId;
    // DELETE USER: Remove the main user account
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // CASCADING DELETE: Clean up "orphan" data
    // We use Promise.all to delete their Posts, Comments, and Likes simultaneously.
    // The $or operator covers different naming conventions (user_id vs userId)
    try {
      await Promise.all([
        PrayerPost.deleteMany({
          $or: [{ user_id: userId }, { author: userId }, { userId: userId }],
        }),
        Comment.deleteMany({
          $or: [{ author: userId }, { user_id: userId }, { userId: userId }],
        }),
        Like.deleteMany({ user_id: userId }),
      ]);
    } catch (cleanupErr) {
      console.warn('Cleanup warning:', cleanupErr); // Log if cleanup fails, but don't stop the delete
    }

    // LOGOUT: Clear the cookie so the browser knows the user is gone
    cookieStore.delete('token');

    return NextResponse.json({ message: 'Account deleted' }, { status: 200 });
  } catch (err) {
    console.error('DELETE ERROR:', err);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: err.message,
      },
      { status: 500 }
    );
  }
}
