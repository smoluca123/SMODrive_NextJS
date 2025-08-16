import { getStatsQueryKey } from '@/hooks/querys/user.querys';
import { useAuth } from '@/hooks/use-auth';
import { multipartUpload, uploadSimpleFile } from '@/hooks/use-file-upload/actions/actions';
import { FILE_SIZE_THRESHOLD } from '@/lib/constant/contants';
import { IUserStatsAndUserDataType } from '@/lib/types/interfaces/user.interfaces';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export type UploadStatus = 'idle' | 'uploading' | 'completed' | 'error';

export const useUploadFileMutation = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const smartUploadFile = async ({
    file,
    description,
    tags,
    isPublic,
  }: {
    file: File;
    description: string;
    tags: string;
    isPublic: boolean;
  }) => {
    setStatus('uploading');
    if (!session) return;
    try {
      if (file.size >= FILE_SIZE_THRESHOLD) {
        return await multipartUpload(file, (percent) => {
          setUploadProgress(percent);
        });
      } else {
        return await uploadSimpleFile(
          {
            fileToUpload: file,
            description,
            tags,
            isPublic,
          },
          (percent) => {
            setUploadProgress(percent);
          },
        );
      }
    } catch (error) {
      setStatus('error');
      throw new Error(error as string);
    } finally {
      setStatus('completed');
    }
  };
  const mutation = useMutation({
    mutationFn: smartUploadFile,
    onSuccess: (variables) => {
      if (!variables) return;

      const userStatsQueryFilters: QueryFilters = {
        queryKey: getStatsQueryKey,
      };

      queryClient.cancelQueries({ queryKey: getStatsQueryKey });
      queryClient.setQueriesData(userStatsQueryFilters, (old: IUserStatsAndUserDataType) => {
        if (!old) return;
        return {
          ...old,
          totalStorageUsed: String(Number(old.totalStorageUsed) + Number(variables.data.size)),
        };
      });

      // updateSession((currentUser) => {
      //   if (!currentUser) return null;
      //   return {
      //     ...currentUser,
      //     userStats: {
      //       ...currentUser.userStats,
      //       totalStorageUsed: String(
      //         Number(currentUser.userStats.totalStorageUsed) + Number(variables.data.size),
      //       ),
      //     },
      //   };
      // });
    },
  });

  return {
    ...mutation,
    uploadProgress,
    uploadStatus: status,
  };
};
