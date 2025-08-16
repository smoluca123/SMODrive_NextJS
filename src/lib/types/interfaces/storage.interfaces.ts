import {
  IUserDataType,
  IUserWithStatsAndSubscriptionDataType,
} from '@/lib/types/interfaces/user.interfaces';

export interface IFileDataType {
  id: string;
  ownerId: string;
  originalName: string;
  key: string;
  size: string;
  slug: string;
  mimetype: string;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  owner: IUserWithStatsAndSubscriptionDataType;
  downloadCount: number;
  expiredAt: null;
}

export interface IDownloadSessionDataType {
  id: string;
  fileId: string;
  userId: string;
  step: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

export interface IDownloadSessionWithFileDataType extends IDownloadSessionDataType {
  file: IFileDataType;
}

export interface IDownloadSessionWithFileAndUserDataType extends IDownloadSessionWithFileDataType {
  user: IUserDataType;
}

export interface IDownloadSessionWithUserDataType extends IDownloadSessionDataType {
  user: IUserDataType;
}
