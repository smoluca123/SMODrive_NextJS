// 'use client';
// import { useAuth } from '@/hooks/use-auth';
// import { setAuthCookie } from '@/lib/apis/auth-apis';
// import { refreshAccessTokenApi } from '@/lib/apis/user-apis';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef } from 'react';

// export default function useRefreshToken() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const mutation = useMutation({
//     mutationFn: async () => {
//       try {
//         if (!user) {
//           router.push('/login');
//           return;
//         }
//         const { data } = await refreshAccessTokenApi({
//           accessToken: user.accessToken,
//         });

//         await setAuthCookie({
//           accessToken: data.accessToken,
//           userId: user.id,
//         });

//         return data;
//       } catch (error) {
//         console.error(error);
//         router.push('/login');
//         return null;
//       }
//     },
//   });
//   const interval = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     mutation.mutate();

//     if (interval.current) {
//       return;
//     }
//     interval.current = setInterval(() => {
//       mutation.mutate();
//     }, 1000 * 60);
//     return () => {
//       if (interval.current) {
//         clearInterval(interval.current);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return mutation;
// }
