'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Download,
  Eye,
  Calendar,
  HardDrive,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Code,
} from 'lucide-react';
import type { FileItem } from '@/hooks/use-file-system';

interface FilePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: FileItem | null;
}

export function FilePreviewModal({ open, onOpenChange, file }: FilePreviewModalProps) {
  if (!file) return null;

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <FileText className='h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground' />;

    if (fileType.startsWith('image/'))
      return <ImageIcon className='h-12 w-12 sm:h-16 sm:w-16 text-green-500' />;
    if (fileType.startsWith('video/'))
      return <Video className='h-12 w-12 sm:h-16 sm:w-16 text-purple-500' />;
    if (fileType.startsWith('audio/'))
      return <Music className='h-12 w-12 sm:h-16 sm:w-16 text-orange-500' />;
    if (fileType.includes('zip') || fileType.includes('rar'))
      return <Archive className='h-12 w-12 sm:h-16 sm:w-16 text-yellow-500' />;
    if (fileType.includes('pdf'))
      return <FileText className='h-12 w-12 sm:h-16 sm:w-16 text-red-500' />;
    if (fileType.includes('text') || fileType.includes('markdown'))
      return <Code className='h-12 w-12 sm:h-16 sm:w-16 text-blue-500' />;

    return <FileText className='h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground' />;
  };

  const renderPreview = () => {
    if (!file.fileType) return null;

    // Image preview
    if (file.fileType.startsWith('image/')) {
      return (
        <img
          src={file.preview || '/placeholder.svg'}
          alt={file.name}
          className='w-full h-full object-cover rounded-lg'
        />
      );
    }

    // Text/Markdown preview
    if (file.fileType.includes('text') || file.fileType.includes('markdown')) {
      return (
        <ScrollArea className='h-full w-full'>
          <div className='p-4 bg-muted/50 rounded-lg'>
            <pre className='text-xs sm:text-sm whitespace-pre-wrap font-mono'>
              {file.content || 'No content available for preview'}
            </pre>
          </div>
        </ScrollArea>
      );
    }

    // PDF preview placeholder
    if (file.fileType.includes('pdf')) {
      return (
        <div className='w-full h-full flex items-center justify-center bg-muted/50 rounded-lg'>
          <div className='text-center space-y-2'>
            <FileText className='h-12 w-12 sm:h-16 sm:w-16 mx-auto text-red-500' />
            <p className='text-sm text-muted-foreground'>PDF Preview</p>
            <p className='text-xs text-muted-foreground'>Click download to view full document</p>
          </div>
        </div>
      );
    }

    // Video preview placeholder
    if (file.fileType.startsWith('video/')) {
      return (
        <div className='w-full h-full flex items-center justify-center bg-muted/50 rounded-lg'>
          <div className='text-center space-y-2'>
            <Video className='h-12 w-12 sm:h-16 sm:w-16 mx-auto text-purple-500' />
            <p className='text-sm text-muted-foreground'>Video Preview</p>
            <p className='text-xs text-muted-foreground'>Click download to view video</p>
          </div>
        </div>
      );
    }

    // Default preview for other file types
    return (
      <div className='w-full h-full flex items-center justify-center bg-muted/50 rounded-lg'>
        <div className='text-center space-y-2'>
          {getFileIcon(file.fileType)}
          <p className='text-sm text-muted-foreground'>No preview available</p>
          <p className='text-xs text-muted-foreground'>Click download to access file</p>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[900px] max-h-[90vh] overflow-hidden p-4 sm:p-6'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg sm:text-xl'>
            <FileText className='h-5 w-5' />
            <span className='truncate'>{file.name}</span>
          </DialogTitle>
          <DialogDescription>File preview and details</DialogDescription>
        </DialogHeader>

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-6 h-[500px] sm:h-[600px]'>
          {/* Preview Area */}
          <div className='lg:col-span-2'>
            <div className='h-full border rounded-lg overflow-hidden'>{renderPreview()}</div>
          </div>

          {/* File Information */}
          <div className='space-y-4 sm:space-y-6 overflow-y-auto'>
            <div>
              <h3 className='font-semibold mb-2'>Description</h3>
              <p className='text-sm text-muted-foreground'>
                {file.description || 'No description provided.'}
              </p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {file.tags.map((tag, index) => (
                  <Badge key={index} variant='secondary' className='text-xs'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <HardDrive className='h-4 w-4 text-muted-foreground' />
                  <span>Size</span>
                </div>
                <span className='font-medium'>{file.size || 'Unknown'}</span>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <FileText className='h-4 w-4 text-muted-foreground' />
                  <span>Type</span>
                </div>
                <span className='font-medium text-xs sm:text-sm truncate'>
                  {file.fileType || 'Unknown'}
                </span>
              </div>

              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>Uploaded</span>
                </div>
                <span className='font-medium'>
                  {new Date(file.uploadDate).toLocaleDateString()}
                </span>
              </div>

              {file.views !== undefined && (
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Eye className='h-4 w-4 text-muted-foreground' />
                    <span>Views</span>
                  </div>
                  <span className='font-medium'>{file.views.toLocaleString()}</span>
                </div>
              )}

              {file.downloads !== undefined && (
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <Download className='h-4 w-4 text-muted-foreground' />
                    <span>Downloads</span>
                  </div>
                  <span className='font-medium'>{file.downloads.toLocaleString()}</span>
                </div>
              )}
            </div>

            <Button className='w-full rounded-2xl'>
              <Download className='h-4 w-4 mr-2' />
              Download File
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
