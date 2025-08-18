import { FileMoreButton } from '@/components/file-more-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetFileIcon } from '@/hooks/use-get-file-icon';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { formatFileSize, isImageFile } from '@/lib/utils';
import { Edit, Eye } from 'lucide-react';
import Image from 'next/image';

export function FileItem({ file, viewMode }: { file: IFileDataType; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'grid') {
    return <GridFileItem file={file} />;
  }
  return <ListFileItem file={file} />;
}

export function GridFileItem({ file }: { file: IFileDataType }) {
  const getFileIcon = useGetFileIcon();
  return (
    <Card
      key={file.id}
      className='group hover:shadow-lg transition-all duration-200 cursor-pointer'
    >
      <CardContent className='p-3 sm:p-4'>
        <div className='space-y-3'>
          {/* File Icon and Preview */}
          <div
            className='aspect-square bg-muted rounded-lg overflow-hidden relative'
            // onClick={() => onFileAction('open', file)}
          >
            {isImageFile(file.mimetype) ? (
              <Image
                src={'/placeholder.svg'}
                alt={file.originalName}
                className='w-full h-full object-cover'
                fill
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                {getFileIcon(file.mimetype, 'file')}
              </div>
            )}

            {/* Actions Overlay - Hidden on mobile, shown on hover for desktop */}
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 sm:flex'>
              <Button
                size='sm'
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  // onFileAction('preview', file);
                }}
              >
                <Eye className='h-4 w-4' />
              </Button>

              <Button
                size='sm'
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  // onFileAction('edit', file);
                }}
              >
                <Edit className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* File Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <h3
                className='font-medium text-sm leading-tight truncate flex-1'
                title={file.originalName}
              >
                {file.originalName}
              </h3>
              <FileMoreButton file={file} />
            </div>

            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span className='truncate'>
                {formatFileSize(Number(file.size)) || 'Unknown size'}
              </span>
              <Badge variant={file.isPublic ? 'default' : 'secondary'} className='text-xs'>
                {file.isPublic ? 'Public' : 'Private'}
              </Badge>
            </div>

            <div className='flex items-center justify-between text-xs'>
              <span className='truncate'>{file.downloadCount} downloads</span>
              {/* <span className='font-medium'>${file.earnings?.toFixed(2)}</span> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ListFileItem({ file }: { file: IFileDataType }) {
  const getFileIcon = useGetFileIcon();
  return (
    <div
      className='flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 cursor-pointer'
      // onClick={() => onFileAction('open', file)}
    >
      <div className='flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1'>
        <div className='flex-shrink-0'>{getFileIcon(file.mimetype, 'file')}</div>
        <div className='min-w-0 flex-1'>
          <p className='font-medium text-sm truncate'>{file.originalName}</p>
          <p className='text-xs sm:text-sm text-muted-foreground truncate'>
            {`${formatFileSize(Number(file.size))} • ${file.downloadCount} downloads`}
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
        <div className='hidden sm:flex items-center space-x-4'>
          <Badge variant={file.isPublic ? 'default' : 'secondary'}>
            {file.isPublic ? 'Public' : 'Private'}
          </Badge>
          {/* {file.type === 'file' && file.earnings && (
      <span className='font-medium text-sm'>${file.earnings.toFixed(2)}</span>
    )} */}
          <span className='text-sm text-muted-foreground'>
            {new Date(file.createdAt).toLocaleDateString()}
          </span>
        </div>

        <FileMoreButton file={file} />
      </div>
    </div>
  );
}
