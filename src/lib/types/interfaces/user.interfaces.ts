// export interface IUserDataType {
//   id: string;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   avatar: null;
//   createdAt: string;
//   updatedAt: string;
//   isActive: boolean;
//   isEmailVerified: boolean;
//   isPhoneVerified: boolean;
//   isTwoFactorEnabled: boolean;
//   isTwoFactorVerified: boolean;
//   userRole: IUserRoleDataType;
//   subscription: ISubscriptionDataType;
//   accessToken: string;

import { ISubscriptionWithPlanDataType } from '@/lib/types/interfaces/plan.interfaces';

// }
export interface IUserDataType {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  bio: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isTwoFactorEnabled: boolean;
  isTwoFactorVerified: boolean;
  userRole: IUserRoleDataType;
}

export interface IUserWithSubscriptionDataType extends IUserDataType {
  subscription: ISubscriptionWithPlanDataType;
}

export interface IUserWithUserStatsDataType extends IUserDataType {
  stats: IUserStatsDataType;
}

export interface IUserWithStatsAndSubscriptionDataType
  extends IUserWithSubscriptionDataType,
    IUserWithUserStatsDataType {}

export interface IUserDataWithAccessTokenType extends IUserDataType {
  accessToken: string;
}

export interface IUserRoleDataType {
  id: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserStatsDataType {
  id: string;
  totalUploadedSize: string;
  totalFilesUploaded: number;
  totalFilesShared: number;
  totalFilesReceived: number;
  totalDownloads: number;
  totalEarnings: number;
  totalViews: string;
  totalStorageUsed: string;
  isOverStorageLimit: boolean;
  lastUploadAt: Date;
  lastDownloadAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStatsAndUserDataType extends IUserStatsDataType {
  user: IUserDataType;
}
