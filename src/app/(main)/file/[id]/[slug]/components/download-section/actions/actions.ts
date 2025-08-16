'use server';

import { initiateDownloadAPI } from '@/lib/apis/storage-apis';

export const initiateDownload = async (fileId: string) => {
  try {
    const response = await initiateDownloadAPI({ fileId });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};
