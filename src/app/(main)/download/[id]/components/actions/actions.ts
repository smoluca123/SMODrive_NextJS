'use server';
import {
  completeDownloadSessionAPI,
  updateDownloadSessionAPI,
} from '@/lib/apis/server/storage-apis';
import { UpdateDownloadSessionSchema } from '@/lib/zod-schemas/storage-api.schemas';

export const completeDownloadSession = async (id: string) => {
  try {
    const response = await completeDownloadSessionAPI({ id });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateDownloadSession = async (id: string, payload: UpdateDownloadSessionSchema) => {
  try {
    const response = await updateDownloadSessionAPI({ id, payload });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

// export const deleteDownloadSessionCookie = async () => {
//   try {
//     const cookieStore = await cookies();
//     cookieStore.delete('download-session');
//   } catch (error) {
//     throw new Error(error as string);
//   }
// };
