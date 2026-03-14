import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { uploadToS3 } from '@/lib/s3';

export async function POST(request) {
  try {
    await connectMongo();

    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const file = data.get('profilePicture');

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    let profilePictureUrl = '';

    if (file && typeof file !== 'string' && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      profilePictureUrl = await uploadToS3(buffer, file.name, file.type);
    }

    const newUser = await User.create({
      username,
      email,
      password,
      profilePicture: profilePictureUrl,
    });

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
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}