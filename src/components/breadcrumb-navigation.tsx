'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';
import { useFolderStore } from '@/hooks/zustand/useFolder';

// interface BreadcrumbNavigationProps {
//   path: FileItem[];
//   onNavigate: (folderId: string | null) => void;
// }

export function BreadcrumbNavigation() {
  const { selectedFolders, resetSelectedFolders, redirectToFolder } = useFolderStore();
  return (
    <div className='flex items-center space-x-1 text-sm'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => {
          resetSelectedFolders();
        }}
        className='h-8 px-2 text-muted-foreground hover:text-foreground'
      >
        <Home className='h-4 w-4 mr-1' />
        My Files
      </Button>

      {selectedFolders.map((folder) => (
        <div key={folder.id} className='flex items-center space-x-1'>
          <ChevronRight className='h-4 w-4 text-muted-foreground' />
          <Button
            variant='ghost'
            size='sm'
            onClick={() => redirectToFolder(folder.id)}
            className='h-8 px-2 text-muted-foreground hover:text-foreground'
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
