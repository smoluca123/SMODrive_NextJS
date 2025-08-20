import { FileGridSectionSkeletons } from '@/app/(main)/dashboard/files/components/file-grid-section-skeleton';
import { ResponsiveFileGrid } from '@/components/responsive-file-grid';
import type { FileItem } from '@/hooks/use-file-system';
import { useGetFolders, useGetUploadedFiles } from '@/hooks/use-file-system/querys';
import { useFolderStore } from '@/hooks/zustand/useFolder';

interface FilesGridSectionProps {
  viewMode: 'grid' | 'list';
  onFileAction: (action: string, file: FileItem) => void;
}

export function FilesGridSection({ viewMode, onFileAction }: FilesGridSectionProps) {
  const { selectedFolders } = useFolderStore();
  const lastSelectedFolderId = selectedFolders[selectedFolders.length - 1]?.id || '';
  const { data: foldersData, isFetching: isFetchingFolders } = useGetFolders(lastSelectedFolderId);
  const { data: filesData, isFetching: isFetchingFiles } = useGetUploadedFiles({
    folderId: lastSelectedFolderId,
  });

  return (
    <>
      {(isFetchingFolders || isFetchingFiles) && (
        <FileGridSectionSkeletons length={10} mode={viewMode} />
      )}
      {foldersData && filesData && (
        <ResponsiveFileGrid
          InfiniteFilesData={filesData}
          folders={foldersData}
          viewMode={viewMode}
          onFileAction={onFileAction}
        />
      )}
    </>
  );
}
