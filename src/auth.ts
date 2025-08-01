// 'use server';
// import { validateAccessTokenApi } from '@/lib/apis/user-apis';
// import {
//   IUserDataWithAccessTokenType,
//   IUserWithStatsAndSubscriptionDataType,
// } from '@/lib/types/interfaces/user.interfaces';
// import { cookies } from 'next/headers';
// import { cache } from 'react';

// export const validateAuth = cache(
//   async (): Promise<
//     | {
//         isAuthenticated: true;
//         user: IUserWithStatsAndSubscriptionDataType &
//           IUserDataWithAccessTokenType;
//       }
//     | {
//         isAuthenticated: false;
//         user: null;
//       }
//   > => {
//     try {
//       const cookieStore = await cookies();
//       const accessToken = cookieStore.get('accessToken');

//       if (!accessToken) {
//         return {
//           isAuthenticated: false,
//           user: null,
//         };
//       }

//       const res = await validateAccessTokenApi({
//         accessToken: accessToken.value,
//       });

//       // if (!res.success) {
//       //   try {
//       //     cookieStore.delete('accessToken');
//       //     const res = await refreshAccessTokenApi({
//       //       accessToken: accessToken.value,
//       //     });
//       //     cookieStore.set('accessToken', res.data.accessToken);
//       //     return {
//       //       isAuthenticated: true,
//       //       user: res.data,
//       //     };
//       //   } catch (error) {
//       //     console.error('error', error);
//       //     return {
//       //       isAuthenticated: false,
//       //       user: null,
//       //     };
//       //   }
//       // }

//       // if (!data) {
//       //   // Xóa cookie nếu không có user
//       //   cookieStore.delete('accessToken');
//       //   return {
//       //     isAuthenticated: false,
//       //     user: null,
//       //   };
//       // }

//       if (!res.success) {
//         return {
//           isAuthenticated: false,
//           user: null,
//         };
//       }

//       return {
//         isAuthenticated: true,
//         user: res.data,
//       };
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // if (error.response?.status === 401) {
//       //   console.log('error.response?.status === 401', error.message);
//       //   const cookieStore = await cookies();
//       //   const accessToken = cookieStore.get('accessToken');
//       //   if (!accessToken) {
//       //     return {
//       //       isAuthenticated: false,
//       //       user: null,
//       //     };
//       //   }

//       //   try {
//       //     const res = await refreshAccessTokenApi({
//       //       accessToken: accessToken.value,
//       //     });
//       //     await setAuthCookie(res.data.accessToken);
//       //     return {
//       //       isAuthenticated: true,
//       //       user: res.data,
//       //     };
//       //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       //   } catch (error: any) {
//       //     console.error('auth.ts', error);
//       //     return {
//       //       isAuthenticated: false,
//       //       user: null,
//       //     };
//       //   }
//       // }
//       console.log('error', error);
//       return {
//         isAuthenticated: false,
//         user: null,
//       };
//     }
//   }
// );
