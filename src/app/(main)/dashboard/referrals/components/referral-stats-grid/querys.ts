'use client';
import { getReferralStats } from '@/lib/apis/client/referral-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useQuery } from '@tanstack/react-query';

export const getRefferalStatsQueryKey = ['refferals', 'stats', 'me'];

export const useGetRefferalStats = () => {
  const getRefferalsStats = async () => {
    try {
      const { data } = await getReferralStats();
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: getRefferalStatsQueryKey,
    queryFn: getRefferalsStats,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
  });
};
