import { changeUserPasswordAPI } from '@/lib/apis/auth-apis';
import { updateUserInfomationAPI } from '@/lib/apis/user-apis';
import { UpdateUserInfomationValues } from '@/lib/zod-schemas/user-schema';
import { useMutation } from '@tanstack/react-query';
export const useUpdateUserDataMutation = () => {
  const handleUpdateUserData = async (userData: UpdateUserInfomationValues) => {
    try {
      const data = await updateUserInfomationAPI(userData);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['update', 'my-infomation'],
    mutationFn: handleUpdateUserData,
  });

  return mutation;
};

export const useChangeUserPasswordMutation = () => {
  const handleChangeUserPassword = async ({
    oldPassword,
    newPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }) => {
    try {
      const data = await changeUserPasswordAPI({ newPassword, oldPassword });
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['user', 'change-password'],
    mutationFn: handleChangeUserPassword,
  });

  return mutation;
};
