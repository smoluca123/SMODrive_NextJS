import { getMeApi, getStatsApi } from '@/lib/apis/user-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useQuery } from '@tanstack/react-query';

export const getMeQueryKey = ['me'];

export const useGetMe = (options?: { enabled: boolean }) => {
  const getMe = async () => {
    try {
      const { data } = await getMeApi();
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: getMeQueryKey,
    queryFn: getMe,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
    enabled: options?.enabled || true,
  });
};

export const getStatsQueryKey = ['stats', 'me'];

export const useGetMyStats = (options?: { enabled: boolean }) => {
  const getStats = async () => {
    try {
      const { data } = await getStatsApi();
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: getStatsQueryKey,
    queryFn: getStats,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
    enabled: options?.enabled || true,
  });
};
