import { FolderMoreButton } from '@/components/responsive-file-grid/folder-more-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetFileIcon } from '@/hooks/use-get-file-icon';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { Copy, Download, Edit, Eye, MoreHorizontal, Share2, Trash2 } from 'lucide-react';

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
            // onClick={() => onFileAction('preview', file)}
            >
              <Eye className='mr-2 h-4 w-4' />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => onFileAction('edit', file)}
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => onFileAction('download', file)}
            >
              <Download className='mr-2 h-4 w-4' />
              Download
            </DropdownMenuItem>

            <DropdownMenuItem
            // onClick={() => onFileAction('copy', file)}
            >
              <Copy className='mr-2 h-4 w-4' />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem
            // onClick={() => onFileAction('share', file)}
            >
              <Share2 className='mr-2 h-4 w-4' />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-600'
              // onClick={() => onFileAction('delete', file)}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
