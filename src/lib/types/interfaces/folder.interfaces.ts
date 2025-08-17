import { IUserDataType } from '@/lib/types/interfaces/user.interfaces';

export interface IFolderDataType {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IFolderWithOwnerDataType extends IFolderDataType {
  owner: IUserDataType;
}
