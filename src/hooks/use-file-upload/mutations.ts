import { useAuth } from '@/hooks/use-auth';
import { multipartUpload, uploadSimpleFile } from '@/hooks/use-file-upload/actions/actions';
import { FILE_SIZE_THRESHOLD } from '@/lib/constant/contants';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export type UploadStatus = 'idle' | 'uploading' | 'completed' | 'error';

export const useUploadFileMutation = () => {
  const { user } = useAuth();
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
    if (!user) return;
    try {
      console.log(file.size, FILE_SIZE_THRESHOLD);
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
  });

  return {
    ...mutation,
    uploadProgress,
    uploadStatus: status,
  };
};
