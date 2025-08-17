import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { formatFileSize } from '@/lib/utils';
import { Calendar, Download, FileText, HardDrive } from 'lucide-react';

// interface FileHeaderProps {
//   file: {
//     title: string;
//     description: string;
//     uploader: {
//       name: string;
//       avatar: string;
//       verified: boolean;
//     };
//     size: string;
//     type: string;
//     uploadDate: string;
//     downloads: number;
//     tags: string[];
//   };
// }

export function FileHeader({ file }: { file: IFileDataType }) {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <h1 className='text-3xl lg:text-4xl font-bold leading-tight'>{file.originalName}</h1>
        <p className='text-lg text-muted-foreground leading-relaxed'>
          {file.description || 'No description'}
        </p>
      </div>

      {/* Uploader Info */}
      <div className='flex items-center space-x-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src={file.owner.avatar || '/placeholder.svg'}
            alt={file.owner.firstName + ' ' + file.owner.lastName}
          />
          <AvatarFallback>
            {file.owner.firstName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className='flex items-center space-x-2'>
            <p className='font-semibold'>{file.owner.firstName + ' ' + file.owner.lastName}</p>
            {file.owner.isEmailVerified && (
              <Badge variant='secondary' className='text-xs'>
                ✓ Verified
              </Badge>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>Professional Designer</p>
        </div>
      </div>

      {/* File Metadata */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <HardDrive className='h-4 w-4' />
          <span>{formatFileSize(Number(file.size))}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <FileText className='h-4 w-4' />
          <span>{file.mimetype}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <Calendar className='h-4 w-4' />
          <span>{new Date(file.createdAt).toLocaleDateString()}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <Download className='h-4 w-4' />
          <span>{file.downloadCount.toLocaleString()} downloads</span>
        </div>
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2'>
        {file.tags.map((tag, index) => (
          <Badge key={index} variant='secondary' className='rounded-full'>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
