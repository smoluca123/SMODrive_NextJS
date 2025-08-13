'use client';
import { useState } from 'react';
import { DownloadCountdown } from './download-countdown';
import { DownloadInfo } from './download-info';
import { RelatedFiles } from './related-files';
import { DownloadCTA } from './download-cta';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';

interface RelatedFile {
  id: string;
  title: string;
  image: string;
  downloads: string;
}

interface DownloadClientShellProps {
  file: IFileDataType;
  relatedFiles: RelatedFile[];
}

export function DownloadClientShell({ file, relatedFiles }: DownloadClientShellProps) {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <DownloadCountdown
        fileTitle={file.originalName}
        uploader={file.owner.firstName + ' ' + file.owner.lastName}
        onReady={() => setIsReady(true)}
      />
    );
  }
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <DownloadInfo file={file} />
          <RelatedFiles files={relatedFiles} />
          <DownloadCTA />
        </div>
      </div>
    </div>
  );
}
