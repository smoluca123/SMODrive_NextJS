'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FolderPlus } from 'lucide-react';
import { toast } from 'sonner';
import LoadingButton from '@/components/ui/LoadingButton';
import { useDeleteFolder } from '@/components/delete-folder-dialog/mutations';

interface DeleteFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderId: string;
}

export function DeleteFolderDialog({ open, onOpenChange, folderId }: DeleteFolderDialogProps) {
  const { mutate: deleteFolder, isPending } = useDeleteFolder();

  const handleDeleteFolder = async () => {
    deleteFolder(folderId, {
      onSuccess: (data) => {
        toast.success('Successfully', {
          description: `Folder ${data.name} deleted successfully`,
        });
      },
      onError: () => {
        toast.error('Failed', {
          description: 'Failed to delete folder',
        });
      },
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FolderPlus className='h-5 w-5' />
            Delete Folder
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this folder?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' className='cursor-pointer' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <LoadingButton
            variant='destructive'
            loading={isPending}
            onClick={handleDeleteFolder}
            className='cursor-pointer'
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
