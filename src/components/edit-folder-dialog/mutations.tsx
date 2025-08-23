'use client';
import { getFoldersQueryKey } from '@/hooks/use-file-system/querys';
import { updateFolderAPI } from '@/lib/apis/client/storage-apis';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { UpdateFolderSchema } from '@/lib/zod-schemas/storage-api.schemas';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditFolder = () => {
  const queryClient = useQueryClient();
  const updateFolder = async ({ id, payload }: { id: string; payload: UpdateFolderSchema }) => {
    try {
      const { data } = await updateFolderAPI({ id, payload });
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return useMutation({
    mutationFn: updateFolder,
    onSuccess: (data) => {
      const folderQueryFilters: QueryFilters = {
        queryKey: getFoldersQueryKey(data.parentId),
      };
      console.log(folderQueryFilters);
      queryClient.cancelQueries({ queryKey: getFoldersQueryKey(data.parentId) });

      queryClient.setQueriesData(folderQueryFilters, (old: IFolderWithOwnerDataType[]) => {
        if (!old) return;
        const checkFolder = old.some((folder) => folder.id === data.id);
        if (checkFolder) {
          const updatedFolder = old.map((folder) =>
            folder.id === data.id ? { ...folder, ...data } : folder,
          );
          return updatedFolder;
        }
        return [data, ...old];
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
