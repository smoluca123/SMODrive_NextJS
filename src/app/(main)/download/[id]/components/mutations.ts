import {
  completeDownloadSession,
  updateDownloadSession,
} from '@/app/(main)/download/[id]/components/actions/actions';
import { deleteCookieApi, getCookieApi } from '@/lib/apis/server/next-apis';
import { UpdateDownloadSessionSchema } from '@/lib/zod-schemas/storage-api.schemas';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCompleteDownloadSession = () => {
  return useMutation({
    mutationKey: ['complete-download-session'],
    mutationFn: async () => {
      try {
        const downloadSessionCookie = await getCookieApi({
          key: 'download-session',
        });

        const response = await completeDownloadSession(downloadSessionCookie.value);
        return response;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    onSuccess: async (data) => {
      console.log(data);
      await deleteCookieApi({ key: 'download-session' });
    },
    onError: async (error) => {
      console.log(error);
      await deleteCookieApi({ key: 'download-session' });
    },
  });
};

export const useUpdateDownloadSession = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['update-download-session'],
    mutationFn: async (payload: UpdateDownloadSessionSchema) => {
      try {
        const downloadSessionCookie = await getCookieApi({
          key: 'download-session',
        });

        const response = await updateDownloadSession(downloadSessionCookie.value, payload);
        return response;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    onSuccess: () => {
      //   console.log(data);
    },
    onError: async (error) => {
      console.log(error);
      await deleteCookieApi({ key: 'download-session' });
      toast.error('Something went wrong, please try again');
      router.refresh();
    },
  });
};
