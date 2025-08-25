import { IPaginationParamsType } from '@/lib/types/interfaces/utils.interfaces';
import { kyClientInstance } from '@/lib/kyInstance/kyClient';
import { IApiPaginationResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';

export const getReferralStats = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await kyClientInstance.get('referral/stats').json<any>();
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};

export const getReferralUsersAPI = async ({
  page = 1,
  limit = 10,
  userNameOrEmail,
}: IPaginationParamsType & {
  userNameOrEmail?: string;
}) => {
  try {
    const res = await kyClientInstance
      .get('referral/users', {
        searchParams: {
          page,
          limit,
          userNameOrEmail: userNameOrEmail || '',
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .json<IApiPaginationResponseWrapperType<any>>();
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      throw errorData.message;
    }
    throw error.message;
  }
};
