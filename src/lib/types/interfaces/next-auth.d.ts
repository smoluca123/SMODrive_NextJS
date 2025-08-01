import { IUserDataWithAccessTokenType } from '@/lib/types/interfaces/user.interfaces';
import { DefaultSession } from 'next-auth';

// Define session type
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: IUserDataWithAccessTokenType;
    expires: string;
  }

  type User = IUserDataWithAccessTokenType;
}
// Define token type
declare module 'next-auth/jwt' {
  interface JWT {
    userData: IUserDataWithAccessTokenType;
    expires: number;
  }
}
