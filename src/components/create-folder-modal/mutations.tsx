'use client';
import { getFoldersQueryKey } from '@/hooks/use-file-system/querys';
import { createFolderAPI } from '@/lib/apis/storage-apis';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const createFolder = async ({ name, parentId }: { name: string; parentId?: string }) => {
    try {
      const { data } = await createFolderAPI({ name, parentId });
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      const folderQueryFilters: QueryFilters = {
        queryKey: getFoldersQueryKey,
      };
      queryClient.cancelQueries({ queryKey: getFoldersQueryKey });

      queryClient.setQueriesData(folderQueryFilters, (old: IFolderWithOwnerDataType[]) => {
        if (!old) return;

        return [data, ...old];
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
