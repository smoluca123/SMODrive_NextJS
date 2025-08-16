'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useCreateFolder } from '@/components/create-folder-modal/mutations';
import LoadingButton from '@/components/ui/LoadingButton';

interface CreateFolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFolderCreated: (name: string, description: string) => void;
}

export function CreateFolderModal({ open, onOpenChange }: CreateFolderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
  });
  const { mutate: createFolder, isPending } = useCreateFolder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    createFolder(
      { name: formData.name, parentId: formData.parentId },
      {
        onSuccess: () => {
          toast("'Folder created successfully'", {
            description: `"${formData.name}" has been created.`,
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );

    setFormData({ name: '', parentId: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FolderPlus className='h-5 w-5' />
            Create New Folder
          </DialogTitle>
          <DialogDescription>Create a new folder to organize your files.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='folder-name'>Folder Name</Label>
            <Input
              id='folder-name'
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder='Enter folder name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='folder-description'>Description (Optional)</Label>
            <Textarea id='folder-description' placeholder='Describe this folder...' rows={3} />
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <LoadingButton type='submit' loading={isPending}>
              Create Folder
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
