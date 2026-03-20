import { NextResponse } from 'next/server';

/**
 * Handles user logout by clearing the authentication token.
 */

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Overwrite the existing 'token' cookie to invalidate it
  response.cookies.set('token', '', {
    httpOnly: true, // Maintain security by keeping the cookie inaccessible to client scripts
    expires: new Date(0), // This trick tells the browser the cookie is already expired, causing the browser to delete it immediately.
    path: '/', // Ensure the cookie is cleared across the entire site
  });

  return response;
}
