import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import path from 'path';
import fs from 'fs/promises';
import { User } from '@/models/User';

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

    let profilePicturePath = '';

    if (file && typeof file !== 'string') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const savePath = path.join(uploadDir, filename);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(savePath, buffer);
      profilePicturePath = `/uploads/${filename}`;
    }

    const newUser = await User.create({
      username,
      email,
      password,
      profilePicture: profilePicturePath,
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
