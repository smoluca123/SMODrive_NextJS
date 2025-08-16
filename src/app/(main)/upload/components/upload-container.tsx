'use client';

import { useState } from 'react';
import { FileUploadZone } from './file-upload-zone';
import { UploadForm } from './upload-form';
import { useUploadFileMutation } from '@/hooks/use-file-upload/mutations';
import { toast } from 'sonner';
import { UploadFileSchema } from '@/lib/zod-schemas/upload-file.schema';
import { useRouter } from 'next/navigation';

export function UploadContainer() {
  const [files, setFiles] = useState<File | null>(null);
  const router = useRouter();
  const { mutate: uploadFile, uploadProgress, uploadStatus } = useUploadFileMutation();

  const handleSubmit = async (formData: UploadFileSchema) => {
    // Here you would implement the actual upload logic
    // For now, we'll just simulate the upload
    console.log('Uploading files:', files);
    console.log('Form data:', formData);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!files) {
      toast.error('No files selected');
      return;
    }
    uploadFile(
      {
        file: files,
        description: formData.description,
        tags: formData.tags.map((tag) => tag.text).join(','),
        isPublic: formData.isPublic,
      },
      {
        onSuccess: (data) => {
          toast.success('Upload successful!', {
            description: 'Your files have been uploaded and are now available for sharing.',
          });
          if (data) router.push(`/file/${data.data.id}/${data.data.slug}`);
        },
      },
    );

    // Clear files after successful upload
    setFiles(null);
  };

  return (
    <div className='space-y-8'>
      <FileUploadZone file={files} onFileChange={setFiles} />
      <UploadForm
        file={files}
        onSubmit={handleSubmit}
        uploadProgress={uploadProgress}
        uploadStatus={uploadStatus}
      />
    </div>
  );
}
