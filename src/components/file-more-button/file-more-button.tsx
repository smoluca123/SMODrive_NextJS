import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { Copy, Delete, Download, Edit, Eye, MoreHorizontal, Share2 } from 'lucide-react';
import Link from 'next/link';

export function FileMoreButton({ file }: { file: IFileDataType }) {
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
          asChild
        >
          <Link href={`/file/${file.id}`} target='_blank'>
            <Download className='mr-2 h-4 w-4' />
            Download
          </Link>
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
        <DropdownMenuItem>
          <Delete className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
