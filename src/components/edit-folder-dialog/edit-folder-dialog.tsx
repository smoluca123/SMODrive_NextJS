'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import LoadingButton from '@/components/ui/LoadingButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { updateFolderSchema, UpdateFolderSchema } from '@/lib/zod-schemas/storage-api.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditFolder } from '@/components/edit-folder-dialog/mutations';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';

interface EditFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderData: IFolderWithOwnerDataType;
}

export function EditFolderDialog({ open, onOpenChange, folderData }: EditFolderDialogProps) {
  const form = useForm<UpdateFolderSchema>({
    defaultValues: {
      name: folderData.name,
      description: folderData.description,
    },
    resolver: zodResolver(updateFolderSchema),
    mode: 'onTouched',
  });
  const { mutate: createFolder, isPending } = useEditFolder();

  const handleSubmit = (data: UpdateFolderSchema) => {
    createFolder(
      { id: folderData.id, payload: data },
      {
        onSuccess: () => {
          toast("'Folder updated successfully'", {
            description: `"${data.name}" has been updated.`,
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FolderPlus className='h-5 w-5' />
            Edit Folder
          </DialogTitle>
          <DialogDescription>Edit the folder to organize your files.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ex: My Folder' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Folder Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Ex: This folder contains my documents' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <LoadingButton type='submit' loading={isPending}>
                Edit Folder
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
