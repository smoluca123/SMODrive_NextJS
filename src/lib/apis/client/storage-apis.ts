import { kyClientInstance } from '@/lib/kyInstance/kyClient';
import {
  IApiPaginationResponseWrapperType,
  IApiResponseWrapperType,
} from '@/lib/types/interfaces/api.interfaces';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { IPaginationParamsType } from '@/lib/types/interfaces/utils.interfaces';
import {
  GetMultipartSignedUrlSchema,
  getMultipartSignedUrlSchema,
  initiateMultipartUploadSchema,
  InitiateMultipartUploadSchema,
  CompleteMultipartUploadSchema,
  completeMultipartUploadSchema,
  CreateFolderSchema,
  UpdateFolderSchema,
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

export const createFolderAPI = async (payload: CreateFolderSchema) => {
  try {
    const response = await kyClientInstance
      .post('storage/folder', {
        json: payload,
      })
      .json<IApiResponseWrapperType<IFolderWithOwnerDataType>>();
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

export const deleteFolderAPI = async ({ id }: { id: string }) => {
  try {
    const response = await kyClientInstance
      .delete(`storage/folder/${id}`)
      .json<IApiResponseWrapperType<IFolderWithOwnerDataType>>();
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

export const updateFolderAPI = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateFolderSchema;
}) => {
  try {
    const response = await kyClientInstance
      .patch(`storage/folder/${id}`, {
        json: payload,
      })
      .json<IApiResponseWrapperType<IFolderWithOwnerDataType>>();
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

export const getFoldersAPI = async ({ parentId = '' }: { parentId?: string }) => {
  try {
    const response = await kyClientInstance
      .get('storage/folder', {
        searchParams: {
          parentId,
        },
      })
      .json<IApiResponseWrapperType<IFolderWithOwnerDataType[]>>();
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

export const getUploadedFilesAPI = async ({
  folderId = '',
  limit,
  page,
  keyword = '',
  tags = '',
}: { folderId?: string; keyword?: string; tags?: string } & IPaginationParamsType) => {
  try {
    const response = await kyClientInstance
      .get(`storage/file/uploaded`, {
        searchParams: {
          folderId,
          limit,
          page,
          keyword,
          tags,
        },
      })
      .json<IApiPaginationResponseWrapperType<IFileDataType>>();
    console.log(response);
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
