'use client';
import { AuthContext } from '@/context/auth-context';
import { setAuthCookie } from '@/lib/apis/auth-apis';
import {
  refreshAccessTokenApi,
  signInApi,
  validateAccessTokenApi,
} from '@/lib/apis/user-apis';
import { kyClientInstance } from '@/lib/kyInstance/kyClient';
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
    try {
      const { data } = await signInApi(credentials);

      updateAuthState(data);

      await setAuthCookie({
        accessToken: data.accessToken,
        userId: data.id,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      updateAuthState(null);
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.refresh();
    }
  };

  const register = async (userData: RegisterValues) => {
    setIsLoading(true);
    try {
      await kyClientInstance
        .post('auth/signup', {
          json: userData,
        })
        .json();

      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
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
            }
          : {
              user: null,
              isLoading,
              isAuthenticated: false,
              login,
              logout,
              register,
            }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
