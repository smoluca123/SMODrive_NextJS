import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyNumber(number: number) {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export const formatCompactNumber = (number: number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
};

export function splitFile(file: File, partSize = 64 * 1024 * 1024) {
  const parts: Blob[] = [];
  let start = 0;
  while (start < file.size) {
    const end = Math.min(start + partSize, file.size);
    parts.push(file.slice(start, end));
    start = end;
  }
  return parts;
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function getFileType(
  mimeType: string,
): 'archive' | 'image' | 'video' | 'audio' | 'pdf' | 'text' | 'unknown' {
  const mimeTypeRegex = {
    archive:
      /^application\/(zip|x-rar-compressed|x-7z-compressed|gzip|x-tar|x-bzip2|x-xz|vnd\.rar|octet-stream)|^application\/x-(zip-compressed|rar|7z|gtar|bzip|compress)|^multipart\/x-zip$/,

    image:
      /^image\/(jpeg|jpg|png|gif|webp|bmp|tiff|tif|svg\+xml|x-icon|ico|avif|heic|heif)|^application\/postscript$/,

    video:
      /^video\/(mp4|mpeg|avi|quicktime|x-msvideo|x-ms-wmv|webm|ogg|3gpp|x-flv|mkv)|^application\/(mp4|x-mpegURL)$/,

    audio:
      /^audio\/(mpeg|mp3|wav|ogg|aac|flac|x-wav|x-ms-wma|webm|m4a|opus)|^application\/(ogg|x-mpegURL)$/,

    pdf: /^application\/pdf$/,

    text: /^text\/(plain|html|css|javascript|csv|xml|rtf)|^application\/(rtf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|json|xml)$/,
  };
  for (const [type, regex] of Object.entries(mimeTypeRegex)) {
    if (regex.test(mimeType)) {
      return type as 'archive' | 'image' | 'video' | 'audio' | 'pdf' | 'text';
    }
  }
  return 'unknown';
}
