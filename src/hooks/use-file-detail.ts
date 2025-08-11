import { useContext } from 'react';
import { FileDetailContext } from '@/context/file-detail-context';

export const useFileDetail = () => {
  const context = useContext(FileDetailContext);
  if (!context) {
    throw new Error('useFileDetail must be used within a FileDetailProvider');
  }
  return context;
};
