import { getReferralUsersAPI } from '@/lib/apis/client/referral-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useInfiniteQuery } from '@tanstack/react-query';

export const getReferralUsersQueryKey = (userNameOrEmail = '') => [
  'referral',
  'users',
  userNameOrEmail,
];

export const useGetReferralUsersQuery = ({
  limit = 10,
  userNameOrEmail,
}: {
  userNameOrEmail?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: getReferralUsersQueryKey(userNameOrEmail),
    queryFn: ({ pageParam }) => getReferralUsersAPI({ page: pageParam, limit, userNameOrEmail }),
    initialPageParam: 1,
    getNextPageParam: (data) => (data.data.hasNextPage ? data.data.currentPage + 1 : undefined),
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
  });
};
