'use client';
import { getFoldersAPI, getUploadedFilesAPI } from '@/lib/apis/client/storage-apis';
import { GC_TIME, STALE_TIME } from '@/lib/constant/contants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const getFoldersQueryKey = (parentId?: string | null) => [
  'folders',
  { parentId: parentId || null },
];
export const useGetFolders = (parentId?: string, options?: { enabled: boolean }) => {
  const getFolders = async () => {
    try {
      const { data } = await getFoldersAPI({ parentId });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  return useQuery({
    queryKey: getFoldersQueryKey(parentId),
    queryFn: getFolders,
    enabled: options?.enabled || true,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
  });
};

export const getFilesQueryKey = (folderId?: string) => ['files', { folderId: folderId || null }];
export const useGetUploadedFiles = (
  { folderId = '' }: { folderId?: string },
  options?: { enabled: boolean },
) => {
  const getFiles = async ({ pageParam }: { pageParam: number }) => {
    try {
      const { data } = await getUploadedFilesAPI({
        folderId,
        limit: 10,
        page: pageParam,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  return useInfiniteQuery({
    queryKey: getFilesQueryKey(folderId),
    queryFn: ({ pageParam = 1 }) => getFiles({ pageParam }),
    enabled: options?.enabled || true,
    gcTime: GC_TIME,
    staleTime: STALE_TIME,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPreviousPage ? firstPage.currentPage - 1 : undefined;
    },
    initialPageParam: 1,
  });
};
