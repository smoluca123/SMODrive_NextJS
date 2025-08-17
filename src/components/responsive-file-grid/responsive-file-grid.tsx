'use client';
import { Card, CardContent } from '@/components/ui/card';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { InfiniteData } from '@tanstack/react-query';
import { IApiPaginationResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import { FileItem, FolderItem } from '@/components/responsive-file-grid';

interface ResponsiveFileGridProps {
  InfiniteFilesData: InfiniteData<
    IApiPaginationResponseWrapperType<IFileDataType>['data'],
    unknown
  >;
  folders: IFolderWithOwnerDataType[];
  viewMode: 'grid' | 'list';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileAction?: (action: string, file: any) => void;
}

export function ResponsiveFileGrid({
  InfiniteFilesData,
  folders,
  viewMode,
}: ResponsiveFileGridProps) {
  if (viewMode === 'grid') {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6'>
        {/* Folders */}
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} viewMode={viewMode} />
        ))}

        {/* Files */}
        {InfiniteFilesData.pages.flatMap((page) =>
          page.items.map((file) => <FileItem key={file.id} file={file} viewMode={viewMode} />),
        )}
      </div>
    );
  }

  // List view
  return (
    <Card>
      <CardContent className='p-0'>
        <div className='divide-y'>
          {/* Folders */}
          {folders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} viewMode={viewMode} />
          ))}

          {/* Files */}
          {InfiniteFilesData.pages.flatMap((page) =>
            page.items.map((file) => <FileItem key={file.id} file={file} viewMode={viewMode} />),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
