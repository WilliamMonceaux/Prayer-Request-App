import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { uploadToS3 } from '@/lib/s3';

/**
 * Handles new user registration, including profile picture uploads to AWS S3.
 */

export async function POST(request) {
  try {
    await connectMongo();

    // Extract FormData (used instead of req.json() to support file uploads)
    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const file = data.get('profilePicture');

    // Ensure required text fields are present
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Check for existing users to prevent duplicate accounts
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    let profilePictureUrl = '';

    // Handle File Upload if a profile picture was provided
    // check that 'file' is an actual file object and not just an empty string
    if (file && typeof file !== 'string' && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer()); // Convert the file into a Node.js Buffer for the S3 upload utility
      profilePictureUrl = await uploadToS3(buffer, file.name, file.type); // // Upload to S3 and store the returned public URL
    }

    // Create the new user in MongoDB
    const newUser = await User.create({
      username,
      email,
      password,
      profilePicture: profilePictureUrl,
    });

    // Return success response with the new user's public info
    return NextResponse.json(
      {
        message: 'User registered!',
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePicture: newUser.profilePicture,
        },
      },
      { status: 201 }
    );
  } catch (error) {
   // Catch and log any errors during the registration process
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
