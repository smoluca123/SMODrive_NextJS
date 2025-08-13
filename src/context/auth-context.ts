// src/context/AuthContext.tsx
'use client';
import { createContext } from 'react';
import {
  IUserDataWithAccessTokenType,
  IUserWithStatsAndSubscriptionDataType,
} from '@/lib/types/interfaces/user.interfaces';
import { LoginValues, RegisterValues } from '@/lib/zod-schemas/auth.schema';

type UserType = IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType;

type AuthContextType = {
  isLoading: boolean;
  login: (credentials: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterValues) => Promise<void>;
  error: string | null;
} & (
  | {
      user: UserType;
      isAuthenticated: true;
    }
  | {
      user: null;
      isAuthenticated: false;
    }
);

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // Kiểm tra auth state khi component mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Gọi API để kiểm tra token hiện tại
//         const { data } = await kyInstance.get('auth/me').json();
//         setUser(data);
//       } catch (error) {
//         // Token không hợp lệ hoặc hết hạn
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (usernameOrEmail: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const { data } = await kyInstance
//         .post('auth/signin', {
//           json: { usernameOrEmail, password },
//         })
//         .json();

//       setUser(data);
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await kyInstance.post('auth/logout').json();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setUser(null);
//       router.push('/login');
//     }
//   };

//   const register = async (userData: any) => {
//     setIsLoading(true);
//     try {
//       await kyInstance
//         .post('auth/signup', {
//           json: userData,
//         })
//         .json();

//       router.push('/login');
//     } catch (error) {
//       console.error('Registration failed:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
