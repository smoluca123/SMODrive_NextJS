'use client';
import { getFoldersQueryKey } from '@/hooks/use-file-system/querys';
import { createFolderAPI } from '@/lib/apis/client/storage-apis';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { CreateFolderSchema } from '@/lib/zod-schemas/storage-api.schemas';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const createFolder = async (data: CreateFolderSchema) => {
    try {
      const { data: folder } = await createFolderAPI(data);
      return folder;
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return useMutation({
    mutationFn: createFolder,
    onSuccess: (data, { parentId }) => {
      const folderQueryFilters: QueryFilters = {
        queryKey: getFoldersQueryKey(parentId),
      };
      console.log(folderQueryFilters);
      queryClient.cancelQueries({ queryKey: getFoldersQueryKey(parentId) });

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
