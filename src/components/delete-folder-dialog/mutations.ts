import { getFoldersQueryKey } from '@/hooks/use-file-system/querys';
import { deleteFolderAPI } from '@/lib/apis/client/storage-apis';
import { IFolderWithOwnerDataType } from '@/lib/types/interfaces/folder.interfaces';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  const deleteFolder = async (folderId: string) => {
    try {
      const { data } = await deleteFolderAPI({ id: folderId });
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return useMutation({
    mutationKey: ['delete-folder'],
    mutationFn: deleteFolder,
    onSuccess: (data) => {
      const folderQueryFilters: QueryFilters = {
        queryKey: getFoldersQueryKey(data.parentId),
      };
      queryClient.cancelQueries(folderQueryFilters);

      queryClient.setQueriesData(folderQueryFilters, (old: IFolderWithOwnerDataType[]) => {
        if (!old) return;
        return old.filter((folder) => folder.id !== data.id);
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
