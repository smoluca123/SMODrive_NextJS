import { Button } from '@/components/ui/button';
import { RefreshCw, FolderPlus, Upload } from 'lucide-react';
import type { FileItem } from '@/hooks/use-file-system';
import { useQueryClient } from '@tanstack/react-query';
import { getFilesQueryKey, getFoldersQueryKey } from '@/hooks/use-file-system/querys';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BreadcrumbSection } from '@/app/(main)/dashboard/files/components/files-header-section/breadcrumb-section';
import { useFolderStore } from '@/hooks/zustand/useFolder';

interface FilesHeaderSectionProps {
  onReset: () => void;
  onCreateFolder: () => void;
  onUpload: () => void;
  currentFolderId: string | null;
  onBackToRoot: () => void;
  breadcrumbPath: FileItem[];
  onNavigate: (id: string | null) => void;
}

export function FilesHeaderSection({ onCreateFolder, onUpload }: FilesHeaderSectionProps) {
  const [isRefetching, setIsRefetching] = useState(false);
  const queryClient = useQueryClient();
  const { selectedFolders } = useFolderStore();
  const lastSelectedFolderId = selectedFolders[selectedFolders.length - 1]?.id || '';
  const onRefetch = async () => {
    setIsRefetching(true);
    try {
      await queryClient.refetchQueries({ queryKey: getFilesQueryKey(lastSelectedFolderId) });
      await queryClient.refetchQueries({ queryKey: getFoldersQueryKey(lastSelectedFolderId) });
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefetching(false);
    }
  };

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
            onClick={onRefetch}
            className='w-full sm:w-auto bg-transparent cursor-pointer'
            disabled={isRefetching}
          >
            <RefreshCw
              className={cn('h-4 w-4 mr-2', {
                'animate-spin': isRefetching,
              })}
            />
            Refresh
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
      <BreadcrumbSection />
    </>
  );
}
