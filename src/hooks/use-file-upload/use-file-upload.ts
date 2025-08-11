import { useState } from 'react';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  // const uploadFile = useCallback(
  //   async (customFile = null) => {
  //     const fileToUpload = customFile || file;

  //     if (!fileToUpload) {
  //       setError('Không có file được chọn');
  //       return null;
  //     }

  //     setStatus('uploading');
  //     setProgress(0);
  //     setError(null);

  //     try {
  //       // Chọn phương thức upload dựa vào kích thước file
  //       if (fileToUpload.size > FILE_SIZE_THRESHOLD) {
  //         return await uploadLargeFile({
  //           fileToUpload,
  //           chunkSize: CHUNK_SIZE,
  //         });
  //       } else {
  //         const result = await uploadSimpleFile(fileToUpload);
  //         setProgress(100);
  //         setResult(result);
  //         setStatus('completed');
  //         return result;
  //       }
  //     } catch (err) {
  //       setError(err.message || 'Upload thất bại');
  //       setStatus('error');
  //       return null;
  //     }
  //   },
  //   [file]
  // );

  return { file, handleFileSelect };
}
