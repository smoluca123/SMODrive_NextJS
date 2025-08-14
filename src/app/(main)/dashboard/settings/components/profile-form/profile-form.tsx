'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import {
  updateUserInfomationSchema,
  UpdateUserInfomationValues,
} from '@/lib/zod-schemas/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateAvatarDialog } from '@/components/update-avatar-dialog';
import LoadingButton from '@/components/ui/LoadingButton';
import { toast } from 'sonner';
import { ProfileFormSkeleton } from '@/app/(main)/dashboard/settings/components/profile-form';
import { useUpdateUserDataMutation } from '@/app/(main)/dashboard/settings/components/profile-form/mutations';

export function ProfileForm() {
  const { user, updateAuthState } = useAuth();

  const [updateAvatarDialogOpen, setUpdateAvatarOpen] = useState(false);

  //react hook fomr
  const form = useForm<UpdateUserInfomationValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      bio: '',
      website: '',
    },
    resolver: zodResolver(updateUserInfomationSchema),
    mode: 'onTouched',
  });

  const { mutate: updateUserInfomation, isPending } = useUpdateUserDataMutation();

  const handleSubmit = (value: UpdateUserInfomationValues) => {
    updateUserInfomation(value, {
      onSuccess: (data) => {
        toast.success(data.message);
        updateAuthState(data.data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  // render form values
  useEffect(() => {
    if (!user) return;
    form.setValue('phone', user.phone);
    form.setValue('firstName', user.firstName);
    form.setValue('lastName', user.lastName);
    form.setValue('bio', user.bio);
    form.setValue('website', user.website);
  }, [user, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <span className='inline-block'>
            <svg width='20' height='20' fill='none'>
              <path
                d='M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          Profile Information
        </CardTitle>
        <CardDescription>Update your personal information and profile details</CardDescription>
      </CardHeader>
      <CardContent>
        {user && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
              {/* User avatar */}
              <div className='flex items-center space-x-4'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage src={user.avatar || '/placeholder.png'} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <Button
                    onClick={() => setUpdateAvatarOpen(true)}
                    type='button'
                    variant='outline'
                    size='sm'
                  >
                    <Camera className='h-4 w-4 mr-2' />
                    Change Photo
                  </Button>
                  <UpdateAvatarDialog
                    onClose={() => setUpdateAvatarOpen(false)}
                    isOpen={updateAvatarDialogOpen}
                  />
                  <p className='text-xs text-muted-foreground'>JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              {/* Frist name / last name */}
              <div className='grid md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='First name' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Last name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Phone number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder='Tell us about yourself...' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* website */}
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='https://yourwebsite.com' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton loading={isPending}>Save Changes</LoadingButton>
            </form>
          </Form>
        )}
        {!user && <ProfileFormSkeleton />}
      </CardContent>
    </Card>
  );
}
