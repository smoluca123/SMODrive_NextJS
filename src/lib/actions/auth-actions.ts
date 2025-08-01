'use server';
import { cookies } from 'next/headers';

export const setAuthCookie = async (accessToken: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken);
  } catch (error) {
    throw error;
  }
};

export const deleteAuthCookie = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
  } catch (error) {
    throw error;
  }
};
