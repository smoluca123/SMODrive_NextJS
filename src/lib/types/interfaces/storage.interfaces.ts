import { IUserWithStatsAndSubscriptionDataType } from '@/lib/types/interfaces/user.interfaces';

export interface IFileDataType {
  id: string;
  ownerId: string;
  originalName: string;
  key: string;
  size: string;
  mimetype: string;
  status: string;
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
