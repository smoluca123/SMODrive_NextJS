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
import { useCreateFolder } from '@/components/create-folder-dialog/mutations';
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
import { createFolderSchema, CreateFolderSchema } from '@/lib/zod-schemas/storage-api.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFolderCreated: (name: string, description: string) => void;
}

export function CreateFolderDialog({ open, onOpenChange }: CreateFolderDialogProps) {
  const form = useForm<CreateFolderSchema>({
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
    },
    resolver: zodResolver(createFolderSchema),
    mode: 'onTouched',
  });
  const { mutate: createFolder, isPending } = useCreateFolder();

  const handleSubmit = (data: CreateFolderSchema) => {
    createFolder(data, {
      onSuccess: () => {
        toast("'Folder created successfully'", {
          description: `"${data.name}" has been created.`,
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    form.reset();
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
                Create Folder
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
