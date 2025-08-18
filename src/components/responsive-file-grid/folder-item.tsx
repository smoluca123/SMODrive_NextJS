import { EditFolderDialog } from '@/components/edit-folder-dialog/edit-folder-dialog';
import { FolderMoreButton } from '@/components/folder-more-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetFileIcon } from '@/hooks/use-get-file-icon';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { Edit, Eye } from 'lucide-react';
import { useState } from 'react';

export function FolderItem({
  folder,
  viewMode,
}: {
  folder: IFolderWithOwnerDataType;
  viewMode: 'grid' | 'list';
}) {
  if (viewMode === 'grid') {
    return <GridFolderItem folder={folder} />;
  }
  return <ListFolderItem folder={folder} />;
}

export function GridFolderItem({ folder }: { folder: IFolderWithOwnerDataType }) {
  const getFileIcon = useGetFileIcon();
  return (
    <Card
      key={folder.id}
      className='group hover:shadow-lg transition-all duration-200 cursor-pointer'
    >
      <CardContent className='p-3 sm:p-4'>
        <div className='space-y-3'>
          {/* File Icon and Preview */}
          <div
            className='aspect-square bg-muted rounded-lg overflow-hidden relative'
            // onClick={() => onFileAction('open', file)}
          >
            <div className='w-full h-full flex items-center justify-center'>
              {getFileIcon(folder.name, 'folder')}
            </div>

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

              <EditActionOverlay folder={folder} />
            </div>
          </div>

          {/* File Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <h3 className='font-medium text-sm leading-tight truncate flex-1' title={folder.name}>
                {folder.name}
              </h3>
              <FolderMoreButton folder={folder} />
            </div>

            {/* <div className='flex items-center justify-between text-xs text-muted-foreground'>
          <Badge variant='default' className='text-xs'>
            {folder.status}
          </Badge>
        </div> */}

            {/* <div className='flex items-center justify-between text-xs'>
          <span className='truncate'>{file.downloadCount} downloads</span>
          <span className='font-medium'>${file.earnings?.toFixed(2)}</span>
        </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ListFolderItem({ folder }: { folder: IFolderWithOwnerDataType }) {
  const getFileIcon = useGetFileIcon();
  return (
    <div
      key={folder.id}
      className='flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 cursor-pointer'
      // onClick={() => onFileAction('open', file)}
    >
      <div className='flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1'>
        <div className='flex-shrink-0'>{getFileIcon(folder.name, 'folder')}</div>
        <div className='min-w-0 flex-1'>
          <p className='font-medium text-sm truncate'>{folder.name}</p>
        </div>
      </div>

      <div className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
        <div className='hidden sm:flex items-center space-x-4'>
          <Badge variant='default'>Folder</Badge>
          {/* {file.type === 'file' && file.earnings && (
        <span className='font-medium text-sm'>${file.earnings.toFixed(2)}</span>
      )} */}
          <span className='text-sm text-muted-foreground'>
            {new Date(folder.createdAt).toLocaleDateString()}
          </span>
        </div>

        <FolderMoreButton folder={folder} />
      </div>
    </div>
  );
}

export function EditActionOverlay({ folder }: { folder: IFolderWithOwnerDataType }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        size='sm'
        variant='secondary'
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className='cursor-pointer'
      >
        <Edit className='h-4 w-4' />
      </Button>
      <EditFolderDialog open={open} onOpenChange={setOpen} folderData={folder} />
    </>
  );
}
