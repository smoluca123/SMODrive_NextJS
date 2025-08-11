import { getMyStatsApi } from '@/lib/apis/user-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useQuery } from '@tanstack/react-query';

export const getMyStatsQueryKey = ['my-stats'];

export const useGetMyStats = () => {
  const getMyStats = async () => {
    try {
      const response = await getMyStatsApi();
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: getMyStatsQueryKey,
    queryFn: () => getMyStats(),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};
