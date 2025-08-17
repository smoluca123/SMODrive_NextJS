import { useDeleteFolder } from '@/components/responsive-file-grid/folder-more-button/mutations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { Copy, Download, Edit, Eye, MoreHorizontal, Share2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function FolderMoreButton({ folder }: { folder: IFolderWithOwnerDataType }) {
  const { mutate: deleteFolder } = useDeleteFolder();
  const handleDeleteFolder = () => {
    deleteFolder(folder.id, {
      onSuccess: () => {
        toast.success('Successfully', {
          description: 'Folder deleted successfully',
        });
      },
      onError: () => {
        toast.error('Failed', {
          description: 'Failed to delete folder',
        });
      },
    });
  };
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
        <DropdownMenuItem className='text-red-600' onClick={handleDeleteFolder}>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
