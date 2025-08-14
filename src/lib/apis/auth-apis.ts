import { kyClientInstance } from '@/lib/kyInstance/kyClient';
import { kyNextInstance } from '../kyInstance/kyNext';
import { IApiResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import { IUserWithStatsAndSubscriptionDataType } from '@/lib/types/interfaces/user.interfaces';

export const setAuthCookie = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  try {
    await kyNextInstance.post('auth/auth-cookie', {
      json: {
        accessToken,
        userId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAuthCookie = async () => {
  try {
    await kyNextInstance.delete('auth/auth-cookie');
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeUserPasswordAPI = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const data = await kyClientInstance
      .put('auth/change-password', {
        json: { oldPassword, newPassword },
      })
      .json<IApiResponseWrapperType<IUserWithStatsAndSubscriptionDataType>>();

    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};
