'use client';
import { AuthContext, UserType } from '@/context/auth-context';
import { deleteAuthCookie, setAuthCookie } from '@/lib/apis/server/auth-apis';
import {
  refreshAccessTokenApi,
  signInApi,
  signUpApi,
  validateAccessTokenApi,
} from '@/lib/apis/server/user-apis';
import { LoginValues, RegisterValues } from '@/lib/zod-schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

interface AuthProviderProps {
  // initialUser: UserType | null;
  // initialIsAuthenticated: boolean;
  accessToken: string;
  userId: string;
}

export type SessionType = { error: string | null; isLoading: boolean } & (
  | {
      isAuthenticated: true;
      user: UserType;
    }
  | {
      isAuthenticated: false;
      user: null;
    }
);

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

  const [session, setSession] = useState<SessionType>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  const setSessionLoading = (isLoading: boolean) => {
    setSession((prev) => ({
      ...prev,
      isLoading,
    }));
  };

  const setSessionError = (error: string | null) => {
    setSession((prev) => ({
      ...prev,
      error,
    }));
  };

  // // Kiểm tra auth state khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      setSessionLoading(true);
      try {
        if (!accessToken || !userId) {
          setSession({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,
          });
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
            setSession({
              isAuthenticated: true,
              user: res.data,
              isLoading: false,
              error: null,
            });
            await setAuthCookie({
              accessToken: res.data.accessToken,
              userId,
            });
            return;
          } catch (error) {
            await deleteAuthCookie();
            console.error('Error refreshing access token:', error);
            setSession({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: null,
            });
            return;
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { accessToken: _accessToken, ...userData } = res.data.data;
        // queryClient.setQueryData<IUserWithStatsAndSubscriptionDataType>([QUERY_KEYS.ME], userData, {
        //   updatedAt: Date.now(),
        // });

        setSession({
          error: null,
          isAuthenticated: true,
          user: userData,
          isLoading: false,
        });
        await setAuthCookie({
          accessToken: res.data.data.accessToken,
          userId,
        });
      } catch (error) {
        console.error('Error validating access token:', error);
        // Token không hợp lệ hoặc hết hạn
        setSession({
          error: null,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      } finally {
        setSessionLoading(false);
      }
    };

    checkAuth();
  }, [accessToken, userId]);

  // Helper function to update both user and authentication state consistently
  const updateSession = (
    newUserData: UserType | null | ((newUserData: UserType | null) => UserType | null),
  ) => {
    if (typeof newUserData === 'function') {
      const newData = newUserData(session.user);
      if (newData) {
        setSession({
          isAuthenticated: true,
          user: newData,
          isLoading: false,
          error: null,
        });
      } else {
        setSession({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
      return;
    }

    if (newUserData) {
      setSession((currentSession) => ({
        isAuthenticated: true,
        user: {
          ...(currentSession.user || {}),
          ...newUserData,
        },
        isLoading: false,
        error: null,
      }));
    } else {
      setSession({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  };

  const login = async (credentials: LoginValues) => {
    setSessionLoading(true);
    setSessionError(null);
    try {
      const res = await signInApi(credentials);

      if (res.success) {
        updateSession(res.data.data);
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
      setSessionError(error.message as string);
    } finally {
      setSessionLoading(false);
    }
  };

  const logout = async () => {
    try {
      updateSession(null);
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
    setSessionLoading(true);
    setSessionError(null);
    try {
      const res = await signUpApi(userData);

      if (res.success) {
        updateSession(res.data.data);
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
      setSessionError(error.message as string);
    } finally {
      setSessionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={
        session.isAuthenticated
          ? {
              session, // TypeScript knows user must be non-null when isAuthenticated is true
              updateSession,
              login,
              logout,
              register,
            }
          : {
              session,
              updateSession,
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
