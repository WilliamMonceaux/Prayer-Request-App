import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { PrayerPost } from '@/models/PrayerPost'; 
import { Comment } from '@/models/Comment';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// --- UPDATE PROFILE (PATCH) ---
export async function PATCH(req) {
  try {
    await connectMongo();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await req.json();
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update allowed fields
    const allowedUpdates = ['username', 'email', 'password', 'profilePicture'];
    allowedUpdates.forEach((key) => {
      if (data[key] && data[key].trim() !== '') {
        user[key] = data[key];
      }
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ 
      message: 'Profile updated successfully', 
      user: userResponse 
    }, { status: 200 });

  } catch (err) {
    console.error('PATCH ERROR:', err);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

// --- DELETE ACCOUNT (DELETE) ---
export async function DELETE(req) {
  try {
    await connectMongo();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtErr) {
      return NextResponse.json({ message: 'Session expired. Please log in again.' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 1. Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 2. Clean up user's content (Prayers and Comments)
    // We use $or to catch whichever naming convention your schema uses
    try {
      await PrayerPost.deleteMany({ 
        $or: [{ user_id: userId }, { author: userId }, { userId: userId }] 
      }); 
      
      await Comment.deleteMany({ 
        $or: [{ author: userId }, { user_id: userId }, { userId: userId }] 
      });
    } catch (cleanupErr) {
      console.warn("Cleanup warning: User deleted, but some orphan content might remain.", cleanupErr);
    }

    // 3. Clear the authentication cookie to log them out
    cookieStore.delete('token');

    return NextResponse.json({ message: 'Account deleted' }, { status: 200 });

  } catch (err) {
    console.error('SERVER DELETE ERROR:', err);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      error: err.message 
    }, { status: 500 });
  }
}