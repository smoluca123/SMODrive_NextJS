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
