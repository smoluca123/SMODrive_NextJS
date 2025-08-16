'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Trash2,
  Copy,
  Share2,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Code,
} from 'lucide-react';
import type { FileItem } from '@/hooks/use-file-system';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { InfiniteData } from '@tanstack/react-query';
import { IApiPaginationResponseWrapperType } from '@/lib/types/interfaces/api.interfaces';
import { formatFileSize, getFileType } from '@/lib/utils';

interface ResponsiveFileGridProps {
  InfiniteFilesData: InfiniteData<
    IApiPaginationResponseWrapperType<IFileDataType>['data'],
    unknown
  >;
  folders: IFolderWithOwnerDataType[];
  viewMode: 'grid' | 'list';
  onFileAction: (action: string, file: FileItem) => void;
}

export function ResponsiveFileGrid({
  InfiniteFilesData,
  folders,
  viewMode,
  onFileAction,
}: ResponsiveFileGridProps) {
  const getFileIcon = (fileType?: string, type?: string) => {
    if (type === 'folder') return <Folder className='h-5 w-5 sm:h-6 sm:w-6 text-blue-500' />;
    if (!fileType) return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;

    if (getFileType(fileType) === 'image')
      return <ImageIcon className='h-5 w-5 sm:h-6 sm:w-6 text-green-500' />;
    if (getFileType(fileType) === 'video')
      return <Video className='h-5 w-5 sm:h-6 sm:w-6 text-purple-500' />;
    if (getFileType(fileType) === 'audio')
      return <Music className='h-5 w-5 sm:h-6 sm:w-6 text-orange-500' />;
    if (getFileType(fileType) === 'archive')
      return <Archive className='h-5 w-5 sm:h-6 sm:w-6 text-yellow-500' />;
    if (getFileType(fileType) === 'pdf')
      return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-red-500' />;
    if (getFileType(fileType) === 'text')
      return <Code className='h-5 w-5 sm:h-6 sm:w-6 text-blue-500' />;
    return <FileText className='h-5 w-5 sm:h-6 sm:w-6 text-gray-500' />;
  };

  if (viewMode === 'grid') {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6'>
        {/* Folders */}
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className='group hover:shadow-lg transition-all duration-200 cursor-pointer'
          >
            <CardContent className='p-3 sm:p-4'>
              <div className='space-y-3'>
                {/* File Icon and Preview */}
                <div
                  className='aspect-square bg-muted rounded-lg overflow-hidden relative'
                  // onClick={() => onFileAction('open', file)}
                >
                  <div className='w-full h-full flex items-center justify-center'>
                    {getFileIcon(folder.name, 'folder')}
                  </div>

                  {/* Actions Overlay - Hidden on mobile, shown on hover for desktop */}
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 sm:flex'>
                    <Button
                      size='sm'
                      variant='secondary'
                      onClick={(e) => {
                        e.stopPropagation();
                        // onFileAction('preview', file);
                      }}
                    >
                      <Eye className='h-4 w-4' />
                    </Button>

                    <Button
                      size='sm'
                      variant='secondary'
                      onClick={(e) => {
                        e.stopPropagation();
                        // onFileAction('edit', file);
                      }}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                {/* File Info */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between gap-2'>
                    <h3
                      className='font-medium text-sm leading-tight truncate flex-1'
                      title={folder.name}
                    >
                      {folder.name}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm' className='h-8 w-8 p-0 flex-shrink-0'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                        // onClick={() => onFileAction('preview', file)}
                        >
                          <Eye className='mr-2 h-4 w-4' />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        // onClick={() => onFileAction('edit', file)}
                        >
                          <Edit className='mr-2 h-4 w-4' />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                        // onClick={() => onFileAction('download', file)}
                        >
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </DropdownMenuItem>

                        <DropdownMenuItem
                        // onClick={() => onFileAction('copy', file)}
                        >
                          <Copy className='mr-2 h-4 w-4' />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        // onClick={() => onFileAction('share', file)}
                        >
                          <Share2 className='mr-2 h-4 w-4' />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-red-600'
                          // onClick={() => onFileAction('delete', file)}
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <Badge variant='default' className='text-xs'>
                      {folder.status}
                    </Badge>
                  </div> */}

                  {/* <div className='flex items-center justify-between text-xs'>
                    <span className='truncate'>{file.downloadCount} downloads</span>
                    <span className='font-medium'>${file.earnings?.toFixed(2)}</span>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Files */}
        {InfiniteFilesData.pages.flatMap((page) =>
          page.items.map((file) => (
            <Card
              key={file.id}
              className='group hover:shadow-lg transition-all duration-200 cursor-pointer'
            >
              <CardContent className='p-3 sm:p-4'>
                <div className='space-y-3'>
                  {/* File Icon and Preview */}
                  <div
                    className='aspect-square bg-muted rounded-lg overflow-hidden relative'
                    // onClick={() => onFileAction('open', file)}
                  >
                    {file.mimetype.startsWith('image/') ? (
                      <img
                        src={file.key || '/placeholder.svg'}
                        alt={file.originalName}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        {getFileIcon(file.mimetype, 'file')}
                      </div>
                    )}

                    {/* Actions Overlay - Hidden on mobile, shown on hover for desktop */}
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 sm:flex'>
                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={(e) => {
                          e.stopPropagation();
                          // onFileAction('preview', file);
                        }}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>

                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={(e) => {
                          e.stopPropagation();
                          // onFileAction('edit', file);
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between gap-2'>
                      <h3
                        className='font-medium text-sm leading-tight truncate flex-1'
                        title={file.originalName}
                      >
                        {file.originalName}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='sm' className='h-8 w-8 p-0 flex-shrink-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                          // onClick={() => onFileAction('preview', file)}
                          >
                            <Eye className='mr-2 h-4 w-4' />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          // onClick={() => onFileAction('edit', file)}
                          >
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                          // onClick={() => onFileAction('download', file)}
                          >
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </DropdownMenuItem>

                          <DropdownMenuItem
                          // onClick={() => onFileAction('copy', file)}
                          >
                            <Copy className='mr-2 h-4 w-4' />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          // onClick={() => onFileAction('share', file)}
                          >
                            <Share2 className='mr-2 h-4 w-4' />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600'
                            // onClick={() => onFileAction('delete', file)}
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <span className='truncate'>
                        {formatFileSize(Number(file.size)) || 'Unknown size'}
                      </span>
                      <Badge
                        variant={file.status === 'ACTIVE' ? 'default' : 'secondary'}
                        className='text-xs'
                      >
                        {file.status}
                      </Badge>
                    </div>

                    <div className='flex items-center justify-between text-xs'>
                      <span className='truncate'>{file.downloadCount} downloads</span>
                      {/* <span className='font-medium'>${file.earnings?.toFixed(2)}</span> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )),
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
            <div
              key={folder.id}
              className='flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 cursor-pointer'
              // onClick={() => onFileAction('open', file)}
            >
              <div className='flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1'>
                <div className='flex-shrink-0'>{getFileIcon(folder.name, 'folder')}</div>
                <div className='min-w-0 flex-1'>
                  <p className='font-medium text-sm truncate'>{folder.name}</p>
                </div>
              </div>

              <div className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
                <div className='hidden sm:flex items-center space-x-4'>
                  <Badge variant='default'>Folder</Badge>
                  {/* {file.type === 'file' && file.earnings && (
                    <span className='font-medium text-sm'>${file.earnings.toFixed(2)}</span>
                  )} */}
                  <span className='text-sm text-muted-foreground'>
                    {new Date(folder.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                    // onClick={() => onFileAction('preview', file)}
                    >
                      <Eye className='mr-2 h-4 w-4' />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    // onClick={() => onFileAction('edit', file)}
                    >
                      <Edit className='mr-2 h-4 w-4' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    // onClick={() => onFileAction('download', file)}
                    >
                      <Download className='mr-2 h-4 w-4' />
                      Download
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    // onClick={() => onFileAction('copy', file)}
                    >
                      <Copy className='mr-2 h-4 w-4' />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    // onClick={() => onFileAction('share', file)}
                    >
                      <Share2 className='mr-2 h-4 w-4' />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='text-red-600'
                      // onClick={() => onFileAction('delete', file)}
                    >
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {/* Files */}
          {InfiniteFilesData.pages.flatMap((page) =>
            page.items.map((file) => (
              <div
                key={file.id}
                className='flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 cursor-pointer'
                // onClick={() => onFileAction('open', file)}
              >
                <div className='flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1'>
                  <div className='flex-shrink-0'>{getFileIcon(file.mimetype, 'file')}</div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-medium text-sm truncate'>{file.originalName}</p>
                    <p className='text-xs sm:text-sm text-muted-foreground truncate'>
                      {`${formatFileSize(Number(file.size))} • ${file.downloadCount} downloads`}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
                  <div className='hidden sm:flex items-center space-x-4'>
                    <Badge variant={file.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {file.status}
                    </Badge>
                    {/* {file.type === 'file' && file.earnings && (
                    <span className='font-medium text-sm'>${file.earnings.toFixed(2)}</span>
                  )} */}
                    <span className='text-sm text-muted-foreground'>
                      {new Date(file.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                      // onClick={() => onFileAction('preview', file)}
                      >
                        <Eye className='mr-2 h-4 w-4' />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => onFileAction('edit', file)}
                      >
                        <Edit className='mr-2 h-4 w-4' />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => onFileAction('download', file)}
                      >
                        <Download className='mr-2 h-4 w-4' />
                        Download
                      </DropdownMenuItem>

                      <DropdownMenuItem
                      // onClick={() => onFileAction('copy', file)}
                      >
                        <Copy className='mr-2 h-4 w-4' />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => onFileAction('share', file)}
                      >
                        <Share2 className='mr-2 h-4 w-4' />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='text-red-600'
                        // onClick={() => onFileAction('delete', file)}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
