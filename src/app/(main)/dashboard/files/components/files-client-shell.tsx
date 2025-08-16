'use client';
import { useState } from 'react';
import { useFileSystem } from '@/hooks/use-file-system';
import { FileEditModal } from '@/components/file-edit-modal';
import { FilePreviewModal } from '@/components/file-preview-modal';
import { CreateFolderModal } from '@/components/create-folder-modal';
import { toast } from 'sonner';
import { FilesHeaderSection } from './files-header-section';
import { FilesToolbarSection } from './files-toolbar-section';
import { FilesEmptyState } from './files-empty-state';
import { FilesGridSection } from './files-grid-section';
import type { FileItem } from '@/hooks/use-file-system';

export function FilesClientShell() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  const {
    loading,
    currentFolderId,
    getCurrentFolderContents,
    getBreadcrumbPath,
    navigateToFolder,
    createFolder,
    updateItem,
    deleteItem,
    resetFileSystem,
  } = useFileSystem();

  const handleFileAction = (action: string, file: FileItem) => {
    setSelectedFile(file);
    switch (action) {
      case 'open':
        if (file.type === 'folder') {
          navigateToFolder(file.id);
        } else {
          setPreviewModalOpen(true);
        }
        break;
      case 'preview':
        setPreviewModalOpen(true);
        break;
      case 'edit':
        setEditModalOpen(true);
        break;
      case 'download':
        toast.success('Download started', {
          description: `Downloading ${file.name}...`,
        });
        break;
      case 'copy':
        navigator.clipboard.writeText(`https://shareearn.com/file/${file.id}`);
        toast.success('Link copied', {
          description: 'File link has been copied to clipboard.',
        });
        break;
      case 'delete':
        deleteItem(file.id);
        toast(`${file.type === 'folder' ? 'Folder' : 'File'} deleted`, {
          description: `${file.name} has been deleted.`,
        });
        break;
    }
  };

  const handleCreateFolder = (name: string, description: string) => {
    createFolder(name, description);
  };

  const handleSaveFile = (id: string, updates: Partial<FileItem>) => {
    updateItem(id, updates);
  };

  const filteredFiles = getCurrentFolderContents().filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || file.type === filterBy || file.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'size':
        if (!a.size || !b.size) return 0;
        return Number.parseFloat(a.size) - Number.parseFloat(b.size);
      case 'downloads':
        return (b.downloads || 0) - (a.downloads || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className='p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[50vh]'>
        <div className='text-center space-y-2'>
          <svg
            className='h-8 w-8 animate-spin mx-auto text-muted-foreground'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' opacity='0.25' />
            <path
              d='M4 12a8 8 0 018-8'
              stroke='currentColor'
              strokeWidth='4'
              strokeLinecap='round'
            />
          </svg>
          <p className='text-muted-foreground'>Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6'>
      <FilesHeaderSection
        onReset={resetFileSystem}
        onCreateFolder={() => setCreateFolderModalOpen(true)}
        onUpload={() => {}}
        currentFolderId={currentFolderId}
        onBackToRoot={() => navigateToFolder(null)}
        breadcrumbPath={getBreadcrumbPath()}
        onNavigate={navigateToFolder}
      />
      <FilesToolbarSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      {sortedFiles.length === 0 ? (
        <FilesEmptyState
          searchQuery={searchQuery}
          onCreateFolder={() => setCreateFolderModalOpen(true)}
          onUpload={() => {}}
        />
      ) : (
        <FilesGridSection viewMode={viewMode} onFileAction={handleFileAction} />
      )}
      {/* Modals */}
      <FileEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        file={selectedFile}
        onSave={handleSaveFile}
      />
      <FilePreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        file={selectedFile}
      />
      <CreateFolderModal
        open={createFolderModalOpen}
        onOpenChange={setCreateFolderModalOpen}
        onFolderCreated={handleCreateFolder}
      />
    </div>
  );
}
