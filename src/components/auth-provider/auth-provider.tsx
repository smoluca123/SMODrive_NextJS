'use client';
import { AuthContext } from '@/context/auth-context';
import { deleteAuthCookie, setAuthCookie } from '@/lib/apis/auth-apis';
import {
  refreshAccessTokenApi,
  signInApi,
  signUpApi,
  validateAccessTokenApi,
} from '@/lib/apis/user-apis';
import {
  IUserDataWithAccessTokenType,
  IUserWithStatsAndSubscriptionDataType,
} from '@/lib/types/interfaces/user.interfaces';
import { LoginValues, RegisterValues } from '@/lib/zod-schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

type UserType = IUserWithStatsAndSubscriptionDataType &
  IUserDataWithAccessTokenType;

interface AuthProviderProps {
  // initialUser: UserType | null;
  // initialIsAuthenticated: boolean;
  accessToken: string;
  userId: string;
}

export default function AuthProvider({
  children,
  // initialUser,
  // initialIsAuthenticated,
  accessToken,
  userId,
}: PropsWithChildren<AuthProviderProps>) {
  // Make sure initial state is consistent
  // const validInitialUser = initialIsAuthenticated ? initialUser : null;
  // const validInitialIsAuthenticated = !!initialUser;

  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // // Kiểm tra auth state khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      // setIsLoading(true);
      try {
        if (!accessToken || !userId) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }
        // Gọi API để kiểm tra token hiện tại
        const res = await validateAccessTokenApi({
          accessToken,
        });
        if (!res.success) {
          try {
            const res = await refreshAccessTokenApi({
              accessToken,
            });
            setUser(res.data);
            setIsAuthenticated(true);
            await setAuthCookie({
              accessToken: res.data.accessToken,
              userId,
            });
            return;
          } catch (error) {
            console.error('Error refreshing access token:', error);
            setUser(null);
            setIsAuthenticated(false);
            return;
          }
        }
        setUser(res.data);
        setIsAuthenticated(true);
        await setAuthCookie({
          accessToken: res.data.accessToken,
          userId,
        });
      } catch (error) {
        console.error('Error validating access token:', error);
        // Token không hợp lệ hoặc hết hạn
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [accessToken, userId]);

  // Helper function to update both user and authentication state consistently
  const updateAuthState = (newUser: UserType | null) => {
    if (newUser) {
      setUser(newUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (credentials: LoginValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await signInApi(credentials);

      updateAuthState(data);

      await setAuthCookie({
        accessToken: data.accessToken,
        userId: data.id,
      });

      router.push('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      updateAuthState(null);
      await deleteAuthCookie();
      // refresh page
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // router.refresh();
      window.location.reload();
    }
  };

  const register = async (userData: RegisterValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await signUpApi(userData);

      updateAuthState(data);

      await setAuthCookie({
        accessToken: data.accessToken,
        userId: data.id,
      });
      router.push('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={
        isAuthenticated
          ? {
              user: user as UserType, // TypeScript knows user must be non-null when isAuthenticated is true
              isLoading,
              isAuthenticated: true,
              login,
              logout,
              register,
              error,
            }
          : {
              user: null,
              isLoading,
              isAuthenticated: false,
              login,
              logout,
              register,
              error,
            }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
