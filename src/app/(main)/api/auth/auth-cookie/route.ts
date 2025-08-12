import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userId = cookieStore.get('userId')?.value;

  // if (!accessToken || !userId) {
  //   return NextResponse.json(
  //     { message: 'No access token or user id' },
  //     { status: 401 }
  //   );
  // }

  return NextResponse.json({ accessToken, userId });
}

export async function POST(request: NextRequest) {
  const { accessToken, userId } = await request.json();

  if (!accessToken || !userId) {
    return NextResponse.json(
      { message: 'Access token and user id are required' },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  cookieStore.set('userId', userId, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  const response = NextResponse.json({ message: 'Set access token success' });
  return response;
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('userId');

    return NextResponse.json({ message: 'Delete access token success' });
  } catch (error) {
    console.error('Error deleting access token:', error);

    return NextResponse.json(
      { message: 'Fail to delete cookie' },
      { status: 500 }
    );
  }
}
