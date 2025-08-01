import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { accessToken, userId } = await request.json();

  if (!accessToken || !userId) {
    return NextResponse.json(
      { message: 'Access token and user id are required' },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken);
  cookieStore.set('userId', userId);

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
