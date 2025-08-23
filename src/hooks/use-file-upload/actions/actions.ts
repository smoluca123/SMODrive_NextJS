import {
  abortMultipartUploadAPI,
  completeMultipartUploadAPI,
  getMultipartSignedUrlAPI,
  initiateMultipartUploadAPI,
  uploadFileAPI,
} from '@/lib/apis/client/storage-apis';
import { CHUNK_SIZE } from '@/lib/constant/contants';
import { splitFile } from '@/lib/utils';
import ky from 'ky';

export const uploadSimpleFile = async (
  {
    fileToUpload,
    description,
    tags,
    isPublic = true,
  }: {
    fileToUpload: File;
    description: string;
    tags: string;
    isPublic?: boolean;
  },
  onProgress?: (percent: number) => void,
) => {
  try {
    const result = await uploadFileAPI({
      description,
      tags,
      isPublic,
      file: fileToUpload,
    });
    if (onProgress) onProgress(100);
    return result;
  } catch (err) {
    console.error('Simple upload error:', err);
    throw err;
  }
};
export const uploadLargeFile = async ({
  fileToUpload,
  onProgress,
}: {
  fileToUpload: File;
  onProgress?: (percent: number) => void;
}) => {
  try {
    const completeResult = await multipartUpload(fileToUpload, onProgress);

    return completeResult;
  } catch (err) {
    throw err;
  }
};

// const uploadMultipartFile = async ({
//   fileToUpload,
//   chunkSize,
// }: {
//   fileToUpload: File;
//   chunkSize: number;
// }) => {
//   try {
//     // Khởi tạo multipart upload
//     const { data: initResult } = await initiateMultipartUploadAPI({
//       filename: fileToUpload.name,
//       mimetype: fileToUpload.type,
//       fileSize: fileToUpload.size,
//     });
//     const parts = splitFile(fileToUpload, chunkSize);
//     const signedUrls = await Promise.all(
//       parts.map(async (_, i) => {
//         const { data: signedUrlData } = await getMultipartSignedUrlAPI({
//           key: initResult.key,
//           uploadId: initResult.uploadId,
//           partNumber: i + 1,
//         });
//         return signedUrlData.signedUrl;
//       })
//     );
//     const uploadPromises = signedUrls.map(async (signedUrl, index) => {
//       const part = parts[index];
//       const uploadResponse = await ky.put(signedUrl, {
//         body: part,
//       });
//     });
//   } catch (error) {
//     console.error('Upload multipart file error:', error);
//     throw error;
//   }
// };

// async function uploadPart({
//   signedUrl,
//   part,
//   onProgress,
//   partNumber,
//   totalParts,
// }: {
//   signedUrl: string;
//   part: Blob;
//   onProgress: (progress: number) => void;
//   partNumber: number;
//   totalParts: number;
// }) {
//   const uploadRes = await ky.put(signedUrl, {
//     body: part,
//     headers: { 'Content-Type': 'application/octet-stream' },
//   });
//   if (!uploadRes.ok) throw new Error('Upload part failed');
//   const etag = uploadRes.headers.get('ETag')?.replace(/"/g, '');
//   if (onProgress) onProgress(Math.round((partNumber / totalParts) * 100));
//   return {
//     ETag: etag!,
//     PartNumber: partNumber,
//   };
// }

/**
 * Initiate a multipart upload for a file
 */
async function initiateUpload(file: File) {
  const initRes = await initiateMultipartUploadAPI({
    payload: {
      filename: file.name,
      mimetype: file.type,
      fileSize: file.size,
    },
  });
  return initRes.data;
}

/**
 * Get signed URLs for all parts of a multipart upload
 */
async function getSignedUrls(key: string, uploadId: string, partsCount: number) {
  return Promise.all(
    Array.from({ length: partsCount }, (_, i) =>
      getMultipartSignedUrlAPI({
        payload: {
          key,
          uploadId,
          partNumber: i + 1,
        },
      }).then((res) => res.data.signedUrl),
    ),
  );
}

/**
 * Upload a single part of a file with retry mechanism
 */
async function uploadPart(
  url: string,
  part: Blob,
  partNumber: number,
  etags: { ETag: string; PartNumber: number }[],
  onCompleted?: () => void,
  maxRetries: number = 3,
) {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const uploadRes = await ky.put(url, {
        body: part,
        headers: { 'Content-Type': 'application/octet-stream' },
        timeout: 120000, // Increase timeout to 2 minutes
      });

      if (!uploadRes.ok) throw new Error('Upload part failed');

      const etag = uploadRes.headers.get('ETag')?.replace(/"/g, '');
      etags[partNumber - 1] = { ETag: etag!, PartNumber: partNumber };
      if (onCompleted) onCompleted();
      return; // Success, exit function
    } catch (error) {
      attempts++;
      console.warn(`Part ${partNumber} upload failed, attempt ${attempts}/${maxRetries}`, error);

      if (attempts >= maxRetries) {
        throw new Error(`Failed to upload part ${partNumber} after ${maxRetries} attempts`);
      }

      // Exponential backoff delay before retry
      const delay = Math.min(1000 * Math.pow(2, attempts), 10000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Upload multiple parts with concurrency control and fault tolerance
 */
async function uploadParts(
  parts: Blob[],
  signedUrls: string[],
  concurrency: number = 3, // Reduced concurrency for better stability
  onProgress?: (percent: number) => void,
  maxRetries: number = 3,
) {
  let completed = 0;
  const etags: { ETag: string; PartNumber: number }[] = new Array(parts.length);

  // Create a queue of part indices
  const queue = Array.from({ length: parts.length }, (_, i) => i);

  // Track failed parts for potential retry at the end
  const failedParts: number[] = [];

  // Function to handle the next item in the queue
  async function processNext() {
    while (queue.length) {
      const i = queue.shift();
      if (i === undefined) return;

      try {
        await uploadPart(
          signedUrls[i],
          parts[i],
          i + 1,
          etags,
          () => {
            completed++;
            if (onProgress) {
              onProgress(Math.round((completed / parts.length) * 100));
            }
          },
          maxRetries,
        );
      } catch (error) {
        // If part upload fails even after retries, add to failedParts list
        console.error(`Part ${i + 1} failed after all retry attempts:`, error);
        failedParts.push(i);
      }
    }
  }

  // Start multiple concurrent processors
  const runners: Promise<void>[] = [];
  for (let i = 0; i < Math.min(concurrency, parts.length); i++) {
    runners.push(processNext());
  }

  // Wait for all uploads to complete
  await Promise.all(runners);

  // If there were failed parts, throw an error with details
  if (failedParts.length > 0) {
    throw new Error(
      `Upload failed: ${
        failedParts.length
      } parts could not be uploaded. Failed part numbers: ${failedParts
        .map((i) => i + 1)
        .join(', ')}`,
    );
  }

  return etags;
}

/**
 * Complete a multipart upload
 */
async function completeUpload(
  key: string,
  uploadId: string,
  parts: { ETag: string; PartNumber: number }[],
  file: File,
) {
  return completeMultipartUploadAPI({
    payload: {
      key,
      uploadId,
      parts,
      originalName: file.name,
      size: file.size,
      mimetype: file.type,
    },
  });
}

/**
 * Abort a multipart upload in case of an error
 */
async function abortMultipartUpload(key: string, uploadId: string) {
  try {
    await abortMultipartUploadAPI({ key, uploadId });
  } catch (error) {
    console.error('Failed to abort multipart upload:', error);
  }
}

/**
 * Main function to handle multipart upload of a file with improved error handling
 */
export async function multipartUpload(file: File, onProgress?: (percent: number) => void) {
  let uploadId: string | undefined;
  let key: string | undefined;

  try {
    // 1. Initiate the upload
    const initData = await initiateUpload(file);
    uploadId = initData.uploadId;
    key = initData.key;

    // 2. Split the file into parts
    const parts = splitFile(file, CHUNK_SIZE);

    // 3. Get signed URLs for all parts
    const signedUrls = await getSignedUrls(key, uploadId, parts.length);

    // 4. Upload all parts with concurrency control (reduced to 3 for stability)
    // and enable retries for failed parts (max 3 retries)
    const etags = await uploadParts(parts, signedUrls, 3, onProgress, 3);

    // 5. Complete the multipart upload
    return completeUpload(key, uploadId, etags, file);
  } catch (error: unknown) {
    // Provide more detailed error information
    console.error('Multipart upload failed:', error);

    // If the error is from a part upload, provide more context
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // If we have uploadId and key, attempt to abort the upload
    if (uploadId && key) {
      try {
        await abortMultipartUpload(key, uploadId);
        console.log('Multipart upload aborted successfully');
      } catch (abortError) {
        console.error('Failed to abort multipart upload:', abortError);
      }
    }

    // Rethrow with more context
    throw new Error(`Upload failed: ${errorMessage}`);
  }
}
