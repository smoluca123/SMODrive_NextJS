'use server';
import { changeUserPasswordAPI } from '@/lib/apis/server/user-apis';
import { IApiResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import { IUserWithStatsAndSubscriptionDataType } from '@/lib/types/interfaces/user.interfaces';
import { ChangePasswordValues } from '@/lib/zod-schemas/auth.schema';

export const changePassword = async (
  payload: ChangePasswordValues,
): Promise<
  | {
      success: true;
      data: IApiResponseWrapperType<IUserWithStatsAndSubscriptionDataType>;
    }
  | {
      success: false;
      data: null;
      message: string;
    }
> => {
  try {
    const res = await changeUserPasswordAPI(payload);
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error as string,
    };
  }
};
