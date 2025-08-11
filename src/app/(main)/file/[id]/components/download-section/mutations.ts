import { useMutation } from '@tanstack/react-query';
import { initiateDownload } from '@/app/(main)/file/[id]/components/download-section/actions/actions';

export const useInitiateDownload = () => {
  return useMutation({
    mutationKey: ['initiate-download'],
    mutationFn: initiateDownload,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
