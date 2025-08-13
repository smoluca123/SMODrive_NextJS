import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { createContext } from 'react';

type FileDetailContextType = {
  file: IFileDataType;
};

export const FileDetailContext = createContext<FileDetailContextType | null>(null);
