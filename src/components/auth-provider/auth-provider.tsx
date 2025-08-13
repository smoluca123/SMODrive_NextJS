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

type UserType = IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType;

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

  const [user, setUser] = useState<IUserWithStatsAndSubscriptionDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // // Kiểm tra auth state khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { accessToken: _accessToken, ...userData } = res.data.data;
        // queryClient.setQueryData<IUserWithStatsAndSubscriptionDataType>([QUERY_KEYS.ME], userData, {
        //   updatedAt: Date.now(),
        // });

        setUser(userData);
        setIsAuthenticated(true);
        await setAuthCookie({
          accessToken: res.data.data.accessToken,
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
  const updateAuthState = (
    newUser:
      | (IUserWithStatsAndSubscriptionDataType | null)
      | ((
          user: IUserWithStatsAndSubscriptionDataType | null,
        ) => IUserWithStatsAndSubscriptionDataType | null),
  ) => {
    if (typeof newUser === 'function') {
      const newData = newUser(user);
      if (newData) {
        setUser(newData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      return;
    }

    if (newUser) {
      setUser((currentUser) => ({
        ...(currentUser || {}),
        ...newUser,
      }));
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
      const res = await signInApi(credentials);

      if (res.success) {
        updateAuthState(res.data.data);
        await setAuthCookie({
          accessToken: res.data.data.accessToken,
          userId: res.data.data.id,
        });
        router.push('/dashboard');
      } else {
        throw new Error(res.message);
      }

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
      const res = await signUpApi(userData);

      if (res.success) {
        updateAuthState(res.data.data);
        await setAuthCookie({
          accessToken: res.data.data.accessToken,
          userId: res.data.data.id,
        });
        router.push('/dashboard');
      } else {
        throw new Error(res.message);
      }

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
              updateAuthState,
              login,
              logout,
              register,
              error,
            }
          : {
              user: null,
              isLoading,
              isAuthenticated: false,
              updateAuthState,
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
