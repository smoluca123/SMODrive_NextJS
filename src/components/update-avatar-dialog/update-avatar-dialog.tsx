import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { ImageMinus, Upload, Image } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';
import { useDropzone } from 'react-dropzone';
import { useUpdateAvatar } from '@/components/update-avatar-dialog/mutations';
import { toast } from 'sonner';
import LoadingButton from '@/components/ui/LoadingButton';

export function UpdateAvatarDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { session } = useAuth();
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const handleCloseDialog = (isOpne: boolean) => {
    if (!isOpne) {
      onClose();
      removeOldObjURL();
    }
  };

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(session.user?.avatar || '');

  const removeOldObjURL = useCallback(() => {
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
  }, [avatarPreview]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Remove old object URL
      removeOldObjURL();

      // Create new object URL
      const avatarObjectUrl = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(avatarObjectUrl);
    },
    [removeOldObjURL],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
  });

  const handleSubmit = () => {
    if (!avatar) return;

    updateAvatar(avatar, {
      onSuccess: () => {
        toast.success('Successfully', {
          description: 'Avatar updated successfully',
        });
        onClose();
      },
      onError: (error) => {
        toast.error('Failed', {
          description: error.message || 'Failed to update avatar',
        });
      },
    });
  };

  // Cleanup when unmount
  useEffect(() => {
    return removeOldObjURL;
  }, [removeOldObjURL]);

  if (!session.isAuthenticated) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogTitle>Update You Avatar</DialogTitle>
      <DialogContent>
        <DialogHeader className='text-center font-bold'>Update You Avatar</DialogHeader>
        <Separator />

        <div
          {...getRootProps()}
          className={`group cursor-pointer relative mx-auto size-40 rounded-full border-2 border-dashed transition-all duration-300 ${
            isDragActive
              ? isDragAccept
                ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                : 'border-red-400 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        >
          <input {...getInputProps()} />
          <UserAvatar
            className='!size-full'
            avatarUrl={avatarPreview}
            fallbackName={`${session.user.firstName} ${session.user.lastName}`}
          />
          <div
            className={`absolute inset-0 transition-all duration-300 !size-full grid place-items-center rounded-full ${
              isDragActive ? 'bg-black/40' : 'group-hover:bg-black/20'
            }`}
          >
            {isDragActive ? (
              <div className='flex flex-col items-center text-white'>
                <Upload size={24} className='mb-1' />
                <span className='text-xs font-medium'>
                  {isDragAccept ? 'Drop image here' : 'Invalid file type'}
                </span>
              </div>
            ) : (
              <ImageMinus
                className='duration-300 text-transparent group-hover:text-white'
                size={24}
              />
            )}
          </div>
        </div>

        <p className='text-center text-muted-foreground text-sm'>
          {isDragActive
            ? isDragAccept
              ? 'Drop your image here...'
              : 'Only image files are accepted'
            : 'Drag and drop an image here, or click to browse. Accept JPG, PNG, GIF, WEBP. Max size 50MB.'}
        </p>
        <Button className='mx-auto' onClick={open}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image className='mr-2 h-4 w-4' />
          Choose avatar
        </Button>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
          <LoadingButton onClick={handleSubmit} loading={isPending}>
            Update
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
