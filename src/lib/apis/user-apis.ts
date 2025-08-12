'use server';
import { getCookieApi } from '@/lib/apis/next-apis';
import { env } from '@/lib/env.config';
import { kyInstance } from '@/lib/kyInstance/ky';
import { IApiResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import {
  IUserDataWithAccessTokenType,
  IUserStatsAndUserDataType,
  IUserWithStatsAndSubscriptionDataType,
} from '@/lib/types/interfaces/user.interfaces';
import { LoginValues, RegisterValues } from '@/lib/zod-schemas/auth.schema';
import ky from 'ky';

export const signInApi = async (
  credentials: LoginValues
): Promise<
  | {
      success: true;
      data: IApiResponseWrapperType<
        IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType
      >;
    }
  | {
      success: false;
      message: string;
    }
> => {
  try {
    const data = await kyInstance
      .post('auth/signin', { json: credentials })
      .json<
        IApiResponseWrapperType<
          IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType
        >
      >();
    return {
      success: true,
      data: data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();

      if (Array.isArray(errorData.message)) {
        return {
          success: false,
          message: errorData.message,
        };
      } else {
        return {
          success: false,
          message: errorData.message,
        };
      }
    }
    return {
      success: false,
      message: error.message,
    };
  }
};

export const signUpApi = async (
  credentials: RegisterValues
): Promise<
  | {
      success: true;
      data: IApiResponseWrapperType<
        IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType
      >;
    }
  | { success: false; message: string }
> => {
  try {
    const data = await kyInstance
      .post('auth/signup', { json: credentials })
      .json<
        IApiResponseWrapperType<
          IUserWithStatsAndSubscriptionDataType & IUserDataWithAccessTokenType
        >
      >();
    return {
      success: true,
      data: data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorData = await error.response.json();
      if (Array.isArray(errorData.message)) {
        return {
          success: false,
          message: errorData.message[0],
        };
      } else {
        return {
          success: false,
          message: errorData.message,
        };
      }
    }
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const getMeApi = async ({ accessToken }: { accessToken: string }) => {
  try {
    const data = await kyInstance
      .get('user/me', {
        headers: {
          accessToken: accessToken,
        },
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

export const getMyStatsApi = async () => {
  try {
    const data = await kyInstance
      .get('user/stats')
      .json<IApiResponseWrapperType<IUserStatsAndUserDataType>>();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};

export const validateAccessTokenApi = async (payload?: {
  accessToken?: string;
}): Promise<
  | {
      success: true;
      data: IUserWithStatsAndSubscriptionDataType &
        IUserDataWithAccessTokenType & { expiresAt: number };
    }
  | { success: false; message: string }
> => {
  try {
    const accessTokenCookie = await getCookieApi({ key: 'accessToken' });

    if (!payload?.accessToken && !accessTokenCookie) {
      return {
        success: false,
        message: 'No access token found',
      };
    }

    const data = await ky
      .get(`${env.NEXT_PUBLIC_API_URL}auth/validate-token`, {
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_AUTHORIZATION_TOKEN}`,
          accessToken: payload?.accessToken || accessTokenCookie?.value,
        },
      })
      .json<
        IApiResponseWrapperType<
          IUserWithStatsAndSubscriptionDataType &
            IUserDataWithAccessTokenType & {
              expiresAt: number;
            }
        >
      >();
    return {
      success: true,
      ...data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // throw error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export const refreshAccessTokenApi = async (payload?: {
  accessToken?: string;
}) => {
  const accessTokenCookie = await getCookieApi({ key: 'accessToken' });

  try {
    const data = await ky
      .post(`${env.NEXT_PUBLIC_API_URL}auth/refresh-token`, {
        json: { accessToken: payload?.accessToken || accessTokenCookie?.value },
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_AUTHORIZATION_TOKEN}`,
        },
      })
      .json<
        IApiResponseWrapperType<
          IUserWithStatsAndSubscriptionDataType & { accessToken: string }
        >
      >();
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
