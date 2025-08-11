import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { key, value, options } = await request.json();
  const cookieStore = await cookies();
  cookieStore.set(key, value, options);
  return NextResponse.json({ message: 'Cookie set' });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 });
  }
  const cookieStore = await cookies();
  const value = cookieStore.get(key);
  if (!value) {
    return NextResponse.json({ error: 'Cookie not found' }, { status: 404 });
  }
  return NextResponse.json({ value: value.value });
}

export async function DELETE(request: NextRequest) {
  const { key } = await request.json();
  const cookieStore = await cookies();
  cookieStore.delete(key);
  return NextResponse.json({ message: 'Cookie deleted' });
}
