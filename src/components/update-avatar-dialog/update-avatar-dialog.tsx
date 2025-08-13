import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { ImageMinus } from 'lucide-react';

export function UpdateAvatarDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();

  const handleCloseDialog = (isOpne: boolean) => {
    if (!isOpne) {
      onClose();
      removeOldObjURL();
    }
  };

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user?.avatar || ''
  );

  const onChangeAvatar = () => {
    if (!avatarInputRef) return;
    avatarInputRef.current?.click();
  };

  const removeOldObjURL = useCallback(() => {
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
  }, [avatarPreview]);

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Remove old object URL
    removeOldObjURL();

    // Create new object URL
    const avatarObjectUrl = URL.createObjectURL(file);
    setAvatar(file);
    setAvatarPreview(avatarObjectUrl);

    // Reset file input để chọn lại cùng file vẫn trigger
    e.target.value = '';
  };

  const handleSubmit = () => {
    console.log(avatar);
  };

  // Cleanup when unmount
  useEffect(() => {
    return removeOldObjURL;
  }, [removeOldObjURL]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader className="text-center font-bold">
          Update You Avatar
        </DialogHeader>
        <Separator />

        <div
          onClick={onChangeAvatar}
          className="group  cursor-pointer relative mx-auto size-40"
        >
          <Avatar className="size-40">
            <AvatarImage src={avatarPreview || '/placeholder.png'} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 group-hover:bg-black/20 transition-colors duration-300 size-full grid place-items-center">
            <ImageMinus
              className=" duration-300 text-transparent group-hover:text-white"
              size={24}
            />
          </div>
        </div>

        <Input
          onChange={handleChangeAvatar}
          ref={avatarInputRef}
          hidden
          type="file"
        />

        <p className="text-center text-muted-foreground">
          Accept JPG, PNG or GIF. Max size 2MB.
        </p>
        <Button className="mx-auto  block md:inline " onClick={onChangeAvatar}>
          Change avatar
        </Button>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
