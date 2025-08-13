import { getMeApi } from '@/lib/apis/user-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
  ME: 'me',
};

export const useGetMeQuery = (options?: { enabled: boolean }) => {
  const getMe = async () => {
    try {
      const { data } = await getMeApi();
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getMe,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
    enabled: options?.enabled || true,
  });
};
