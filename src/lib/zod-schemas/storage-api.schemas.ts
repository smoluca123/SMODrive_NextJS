import { z } from 'zod';

export const initiateMultipartUploadSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
  fileSize: z.number(),
});
export type InitiateMultipartUploadSchema = z.infer<typeof initiateMultipartUploadSchema>;

export const uploadFileSchema = z.object({
  file: z.instanceof(File),
});
export type UploadFileSchemaT = z.infer<typeof uploadFileSchema>;

export const getMultipartSignedUrlSchema = z.object({
  key: z.string(),
  uploadId: z.string(),
  partNumber: z.number(),
});
export type GetMultipartSignedUrlSchema = z.infer<typeof getMultipartSignedUrlSchema>;

export const completeMultipartUploadSchema = z.object({
  key: z.string(),
  uploadId: z.string(),
  parts: z.array(
    z.object({
      ETag: z.string(),
      PartNumber: z.number(),
    }),
  ),
  originalName: z.string(),
  size: z.number(),
  mimetype: z.string(),
});

export type CompleteMultipartUploadSchema = z.infer<typeof completeMultipartUploadSchema>;

export const updateDownloadSessionSchema = z.object({
  step: z.coerce.number(),
});
export type UpdateDownloadSessionSchema = z.infer<typeof updateDownloadSessionSchema>;

export const createFolderSchema = z.object({
  name: z.string(),
  description: z.string(),
  parentId: z.string().optional(),
});
export type CreateFolderSchema = z.infer<typeof createFolderSchema>;

export const updateFolderSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
export type UpdateFolderSchema = z.infer<typeof updateFolderSchema>;
