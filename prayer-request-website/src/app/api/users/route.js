import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongo();
    const users = await User.find({}).select('-password -__v').sort({ createdAt: -1 }); // finds users and displays them at top of list; Excludes their passwords when finding users
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req) {
    try {
        await connectMongo();
        const { username, email, password } = await req.json();

        if(!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }


        const newUser = await User.create({
            username,
            email,
            password,
            role: 'user'
        });

        const userResponse = newUser.toObject();

        return NextResponse.json(userResponse, { status: 201 });
    } catch (err) {
        console.error('POST error:', err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}