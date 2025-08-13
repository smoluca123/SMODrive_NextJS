import { kyInstance } from '@/lib/kyInstance/ky';
import { kyClientInstance } from '@/lib/kyInstance/kyClient';
import { IApiResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import {
  IDownloadSessionWithFileAndUserDataType,
  IFileDataType,
} from '@/lib/types/interfaces/storage.interfaces';
import {
  GetMultipartSignedUrlSchema,
  getMultipartSignedUrlSchema,
  initiateMultipartUploadSchema,
  InitiateMultipartUploadSchema,
  CompleteMultipartUploadSchema,
  completeMultipartUploadSchema,
  UpdateDownloadSessionSchema,
  updateDownloadSessionSchema,
} from '@/lib/zod-schemas/storage-api.schemas';

export const uploadFileAPI = async ({
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
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('isPublic', isPublic.toString());

    const response = await kyClientInstance
      .post('storage/upload', {
        body: formData,
      })
      .json<IApiResponseWrapperType<IFileDataType>>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const initiateMultipartUploadAPI = async ({
  payload,
}: {
  payload: InitiateMultipartUploadSchema;
}) => {
  try {
    const validatedData = initiateMultipartUploadSchema.parse(payload);
    // const { filename, mimetype, fileSize } = validatedData;
    const response = await kyClientInstance
      .post('storage/multipart/initiate', {
        json: validatedData,
      })
      .json<
        IApiResponseWrapperType<{
          uploadId: string;
          key: string;
        }>
      >();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const getMultipartSignedUrlAPI = async ({
  payload,
}: {
  payload: GetMultipartSignedUrlSchema;
}) => {
  try {
    const validatedData = getMultipartSignedUrlSchema.parse(payload);
    const { key, uploadId, partNumber } = validatedData;

    const response = await kyClientInstance
      .get('storage/multipart/signed-url', {
        searchParams: {
          key,
          uploadId,
          partNumber,
        },
      })
      .json<
        IApiResponseWrapperType<{
          signedUrl: string;
        }>
      >();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const completeMultipartUploadAPI = async ({
  payload,
}: {
  payload: CompleteMultipartUploadSchema;
}) => {
  try {
    const validatedData = completeMultipartUploadSchema.parse(payload);

    const response = await kyClientInstance
      .post('storage/multipart/complete', {
        json: validatedData,
      })
      .json<IApiResponseWrapperType<IFileDataType>>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const abortMultipartUploadAPI = async ({
  key,
  uploadId,
}: {
  key: string;
  uploadId: string;
}) => {
  try {
    const response = await kyClientInstance
      .post('storage/multipart/abort', {
        json: { key, uploadId },
      })
      .json<IApiResponseWrapperType<{ success: boolean }>>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const getFileDetailAPI = async ({ id }: { id: string }) => {
  try {
    const response = await kyInstance
      .get(`storage/file/${id}`, {
        cache: 'force-cache',
        next: {
          revalidate: 60 * 5, // 5 minutes
        },
      })
      .json<IApiResponseWrapperType<IFileDataType>>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const initiateDownloadAPI = async ({ fileId }: { fileId: string }) => {
  try {
    const response = await kyInstance
      .post(`storage/initiate-download-session/${fileId}`)
      .json<IApiResponseWrapperType<IDownloadSessionWithFileAndUserDataType>>();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const getDownloadSessionAPI = async ({ id }: { id: string }) => {
  try {
    const response = await kyInstance
      .get(`storage/get-download-session/${id}`)
      .json<IApiResponseWrapperType<IDownloadSessionWithFileAndUserDataType>>();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const updateDownloadSessionAPI = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateDownloadSessionSchema;
}) => {
  try {
    const validatedData = updateDownloadSessionSchema.parse(payload);
    const response = await kyInstance
      .post(`storage/update-download-session/${id}`, {
        json: validatedData,
      })
      .json<IApiResponseWrapperType<IDownloadSessionWithFileAndUserDataType>>();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const completeDownloadSessionAPI = async ({ id }: { id: string }) => {
  try {
    const response = await kyInstance
      .post(`storage/complete-download-session/${id}`)
      .json<
        IApiResponseWrapperType<IDownloadSessionWithFileAndUserDataType & { downloadUrl: string }>
      >();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};
