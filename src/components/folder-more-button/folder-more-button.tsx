import { DeleteFolderButton, EditFolderButton } from '@/components/folder-actions/';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { Copy, Eye, MoreHorizontal, Share2 } from 'lucide-react';

export function FolderMoreButton({ folder }: { folder: IFolderWithOwnerDataType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0 flex-shrink-0'>
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
          asChild
          // onClick={() => onFileAction('edit', file)}
        >
          <EditFolderButton folderData={folder} />
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
        <DropdownMenuItem asChild>
          <DeleteFolderButton folderId={folder.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
