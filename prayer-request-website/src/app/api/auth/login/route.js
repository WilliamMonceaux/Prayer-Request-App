import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectMongo();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401});
        }

        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

        return response;
    } catch (err) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}