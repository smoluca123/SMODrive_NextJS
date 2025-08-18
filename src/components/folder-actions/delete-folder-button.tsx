import { DeleteFolderDialog } from '@/components/delete-folder-dialog/delete-folder-dialog';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteFolderButtonProps extends React.ComponentProps<'button'> {
  folderId: string;
}

export function DeleteFolderButton({ folderId, className, ...props }: DeleteFolderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={cn('w-full text-destructive', className)}
        {...props}
        onClick={() => setOpen(true)}
        type='button'
      >
        <Trash2 className='mr-2 h-4 w-4 text-destructive' />
        Delete
      </button>
      <DeleteFolderDialog open={open} onOpenChange={setOpen} folderId={folderId} />
    </>
  );
}
