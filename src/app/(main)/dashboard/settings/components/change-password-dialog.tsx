import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import PasswordInput from '@/components/ui/password-input';
import { changePasswordSchema, ChangePasswordValues } from '@/lib/zod-schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangeUserPasswordMutation } from '@/app/(main)/dashboard/settings/components/mutations';
import { toast } from 'sonner';

export default function ChangePasswordDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Khởi tạo form với react-hook-form và zod resolver
  const form = useForm<ChangePasswordValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
  });

  // Mutation để đổi mật khẩu
  const { mutate: changeUserPasswordMutate, isPending } = useChangeUserPasswordMutation();

  // Đóng dialog và reset form khi đóng
  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      onClose();
    }
  };

  // Xử lý submit form đổi mật khẩu
  const onSubmit = (values: ChangePasswordValues) => {
    changeUserPasswordMutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        handleCloseDialog(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='oldPassword'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder='Enter your current password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='newPassword'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      showIcon
                      passwordStrengthIndicator
                      {...field}
                      placeholder='Enter your new password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='confirmPassword'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder='Re-enter your new password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <LoadingButton loading={isPending} type='submit'>
                Change Password
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
