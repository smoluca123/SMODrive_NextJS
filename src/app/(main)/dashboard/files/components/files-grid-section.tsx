import { ResponsiveFileGrid } from '@/components/responsive-file-grid';
import type { FileItem } from '@/hooks/use-file-system';

interface FilesGridSectionProps {
  files: FileItem[];
  viewMode: 'grid' | 'list';
  onFileAction: (action: string, file: FileItem) => void;
}

export function FilesGridSection({ files, viewMode, onFileAction }: FilesGridSectionProps) {
  return <ResponsiveFileGrid files={files} viewMode={viewMode} onFileAction={onFileAction} />;
}
