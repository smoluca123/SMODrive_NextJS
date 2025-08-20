import { create } from 'zustand';

interface ISelectedFolder {
  id: string;
  name: string;
}

interface IFolderStore {
  selectedFolders: ISelectedFolder[];
}

interface IFolderStoreActions {
  addSelectedFolder: (folder: ISelectedFolder) => void;
  removeSelectedFolder: (folderId: string) => void;
  resetSelectedFolders: () => void;
  redirectToFolder: (folderId: string) => void;
}

export const useFolderStore = create<IFolderStore & IFolderStoreActions>((set) => ({
  selectedFolders: [],
  addSelectedFolder: (folder: ISelectedFolder) =>
    set((state) => {
      const isFolderAlreadySelected = state.selectedFolders.some((f) => f.id === folder.id);
      if (isFolderAlreadySelected) return state;
      return { selectedFolders: [...state.selectedFolders, folder] };
    }),
  removeSelectedFolder: (folderId: string) =>
    set((state) => ({ selectedFolders: state.selectedFolders.filter((f) => f.id !== folderId) })),
  resetSelectedFolders: () => set({ selectedFolders: [] }),
  redirectToFolder: (folderId: string) => {
    set((state) => {
      if (state.selectedFolders.length === 0) return state;

      const folderIndex = state.selectedFolders.findIndex((f) => f.id === folderId);
      const folderName = state.selectedFolders[folderIndex].name;
      const newSelectedFolders = [
        ...state.selectedFolders.slice(0, folderIndex),
        { id: folderId, name: folderName },
      ];

      return {
        selectedFolders: newSelectedFolders,
      };
    });
  },
}));
