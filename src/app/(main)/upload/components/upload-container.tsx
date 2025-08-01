'use client';

import { useState } from 'react';
import { FileUploadZone } from './file-upload-zone';
import { UploadForm } from './upload-form';

interface FormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  isPublic: boolean;
  agreeTerms: boolean;
}

export function UploadContainer() {
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (formData: FormData) => {
    // Here you would implement the actual upload logic
    // For now, we'll just simulate the upload
    console.log('Uploading files:', files);
    console.log('Form data:', formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear files after successful upload
    setFiles([]);
  };

  return (
    <div className="space-y-8">
      <FileUploadZone files={files} onFilesChange={setFiles} />
      <UploadForm files={files} onSubmit={handleSubmit} />
    </div>
  );
}
