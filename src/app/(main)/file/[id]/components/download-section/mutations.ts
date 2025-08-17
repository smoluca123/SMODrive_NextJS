import { initiateDownload } from '@/app/(main)/file/[id]/components/download-section/actions/actions';
import { useMutation } from '@tanstack/react-query';

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
