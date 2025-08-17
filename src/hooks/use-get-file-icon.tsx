'use client';
import {
  getApplicationType,
  isApplicationFile,
  isArchiveFile,
  isAudioFile,
  isImageFile,
  isPdfFile,
  isTextFile,
  isVideoFile,
} from '@/lib/utils';
import {
  AppWindow,
  Archive,
  Code,
  FileText,
  Folder,
  ImageIcon,
  Music,
  Video,
  Phone,
  Apple,
} from 'lucide-react';

export function useGetFileIcon() {
  const getFileIcon = (fileType?: string, type?: string) => {
    if (type === 'folder') return <Folder className='h-5 w-5 sm:h-6 sm:w-6 text-blue-500' />;
    if (!fileType) return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;

    if (isImageFile(fileType))
      return <ImageIcon className='h-5 w-5 sm:h-6 sm:w-6 text-green-500' />;
    if (isVideoFile(fileType)) return <Video className='h-5 w-5 sm:h-6 sm:w-6 text-purple-500' />;
    if (isAudioFile(fileType)) return <Music className='h-5 w-5 sm:h-6 sm:w-6 text-orange-500' />;
    if (isArchiveFile(fileType))
      return <Archive className='h-5 w-5 sm:h-6 sm:w-6 text-yellow-500' />;
    if (isPdfFile(fileType)) return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-red-500' />;
    if (isTextFile(fileType)) return <Code className='h-5 w-5 sm:h-6 sm:w-6 text-blue-500' />;
    if (isApplicationFile(fileType)) {
      switch (getApplicationType(fileType)) {
        case 'windows':
          return <AppWindow className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
        case 'android':
          return <Phone className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
        case 'java':
          return <Code className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
        case 'macos':
          return <Apple className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
        case 'script':
          return <Code className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
        default:
          return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
      }
    }
    // return <AppWindow className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
    return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
  };
  return getFileIcon;
}
