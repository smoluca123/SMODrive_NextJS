'use client';
import { useAuth } from '@/hooks/use-auth';
import { updateAvatarAPI } from '@/lib/apis/client/user-apis';
import { useMutation } from '@tanstack/react-query';

export const useUpdateAvatar = () => {
  const { updateSession } = useAuth();

  const updateAvatar = async (avatar: File) => {
    try {
      const data = await updateAvatarAPI({ avatar });
      return data.data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return useMutation({
    mutationKey: ['update-avatar'],
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      if (data) {
        updateSession((prev) => {
          if (prev) {
            return {
              ...prev,
              avatar: data.avatar,
            };
          }
          return prev;
        });
      }
    },
    onError: () => {
      console.log('Failed to update avatar');
    },
  });
};
