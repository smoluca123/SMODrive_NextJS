import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { RefreshCw, FolderPlus, Upload, ArrowLeft } from 'lucide-react';
import type { FileItem } from '@/hooks/use-file-system';

interface FilesHeaderSectionProps {
  onReset: () => void;
  onCreateFolder: () => void;
  onUpload: () => void;
  currentFolderId: string | null;
  onBackToRoot: () => void;
  breadcrumbPath: FileItem[];
  onNavigate: (id: string | null) => void;
}

export function FilesHeaderSection({
  onReset,
  onCreateFolder,
  onUpload,
  currentFolderId,
  onBackToRoot,
  breadcrumbPath,
  onNavigate,
}: FilesHeaderSectionProps) {
  return (
    <>
      {/* Header */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold'>My Files</h1>
          <p className='text-muted-foreground text-sm sm:text-base'>
            Manage your uploaded files and folders
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={onReset}
            className='w-full sm:w-auto bg-transparent'
          >
            <RefreshCw className='h-4 w-4 mr-2' />
            Reset Demo Data
          </Button>
          <Button variant='outline' onClick={onCreateFolder} className='w-full sm:w-auto'>
            <FolderPlus className='h-4 w-4 mr-2' />
            New Folder
          </Button>
          <Button className='w-full sm:w-auto' onClick={onUpload}>
            <Upload className='h-4 w-4 mr-2' />
            Upload File
          </Button>
        </div>
      </div>
      {/* Breadcrumb Navigation */}
      <Card>
        <CardContent className='p-3 sm:p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0'>
            <BreadcrumbNavigation path={breadcrumbPath} onNavigate={onNavigate} />
            {currentFolderId && (
              <Button
                variant='ghost'
                size='sm'
                onClick={onBackToRoot}
                className='self-start sm:self-auto'
              >
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Root
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
