import { EditFolderDialog } from '@/components/edit-folder-dialog/edit-folder-dialog';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { cn } from '@/lib/utils';
import { Edit } from 'lucide-react';
import { useState } from 'react';

interface EditFolderButtonProps extends React.ComponentProps<'button'> {
  folderData: IFolderWithOwnerDataType;
}

export function EditFolderButton({ folderData, className, ...props }: EditFolderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={cn('w-full', className)}
        {...props}
        onClick={() => setOpen(true)}
        type='button'
      >
        <Edit className='mr-2 h-4 w-4' />
        Edit
      </button>
      <EditFolderDialog open={open} onOpenChange={setOpen} folderData={folderData} />
    </>
  );
}
