'use client';

import { useState, useEffect } from 'react';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  fileType?: string;
  size?: string;
  uploadDate: string;
  downloads?: number;
  views?: number;
  earnings?: number;
  status: 'active' | 'pending' | 'inactive';
  description: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  preview?: string;
  content?: string; // For text files
}

const STORAGE_KEY = 'shareearn-file-system';

// Sample data for testing
const initialFileSystem: FileItem[] = [
  // Root folders
  {
    id: 'folder-1',
    name: 'Design Projects',
    type: 'folder',
    parentId: null,
    uploadDate: '2024-01-15',
    status: 'active',
    description: 'Collection of UI/UX design projects',
    category: 'Design & Graphics',
    tags: ['design', 'ui', 'ux'],
    isPublic: true,
  },
  {
    id: 'folder-2',
    name: 'Development Resources',
    type: 'folder',
    parentId: null,
    uploadDate: '2024-01-10',
    status: 'active',
    description: 'Code snippets and development tools',
    category: 'Software & Apps',
    tags: ['code', 'development', 'tools'],
    isPublic: true,
  },
  {
    id: 'folder-3',
    name: 'Marketing Materials',
    type: 'folder',
    parentId: null,
    uploadDate: '2024-01-08',
    status: 'active',
    description: 'Branding and marketing assets',
    category: 'Business & Finance',
    tags: ['marketing', 'branding', 'assets'],
    isPublic: true,
  },

  // Files in Design Projects folder
  {
    id: 'file-1',
    name: 'Ultimate UI Design System 2024',
    type: 'file',
    parentId: 'folder-1',
    fileType: 'application/zip',
    size: '45.2 MB',
    uploadDate: '2024-01-15',
    downloads: 1247,
    views: 3891,
    earnings: 623.5,
    status: 'active',
    description:
      'A comprehensive design system with 500+ components, icons, and templates. Perfect for modern web and mobile applications.',
    category: 'Design & Graphics',
    tags: ['ui', 'design system', 'components', 'figma'],
    isPublic: true,
    preview: '/placeholder.png',
  },
  {
    id: 'file-2',
    name: 'Mobile App UI Kit',
    type: 'file',
    parentId: 'folder-1',
    fileType: 'application/zip',
    size: '32.1 MB',
    uploadDate: '2024-01-10',
    downloads: 892,
    views: 2156,
    earnings: 446.0,
    status: 'active',
    description: 'Modern mobile app UI components and screens for iOS and Android',
    category: 'Design & Graphics',
    tags: ['mobile', 'ui kit', 'app', 'ios', 'android'],
    isPublic: true,
    preview: '/placeholder.png',
  },
  {
    id: 'file-3',
    name: 'Brand Guidelines.pdf',
    type: 'file',
    parentId: 'folder-1',
    fileType: 'application/pdf',
    size: '8.5 MB',
    uploadDate: '2024-01-12',
    downloads: 234,
    views: 567,
    earnings: 117.0,
    status: 'active',
    description: 'Complete brand guidelines including logo usage, colors, and typography',
    category: 'Design & Graphics',
    tags: ['brand', 'guidelines', 'logo', 'colors'],
    isPublic: true,
    preview: '/placeholder.png',
  },

  // Subfolder in Design Projects
  {
    id: 'folder-4',
    name: 'Icons & Graphics',
    type: 'folder',
    parentId: 'folder-1',
    uploadDate: '2024-01-14',
    status: 'active',
    description: 'Icon sets and graphic elements',
    category: 'Design & Graphics',
    tags: ['icons', 'graphics', 'svg'],
    isPublic: true,
  },

  // Files in Icons & Graphics subfolder
  {
    id: 'file-4',
    name: 'Icon Pack 2024',
    type: 'file',
    parentId: 'folder-4',
    fileType: 'application/zip',
    size: '12.8 MB',
    uploadDate: '2024-01-08',
    downloads: 654,
    views: 1834,
    earnings: 327.0,
    status: 'active',
    description: '500+ modern icons in multiple formats (SVG, PNG, ICO)',
    category: 'Design & Graphics',
    tags: ['icons', 'graphics', 'svg', 'png'],
    isPublic: true,
    preview: '/placeholder.png',
  },
  {
    id: 'file-5',
    name: 'Logo Variations.ai',
    type: 'file',
    parentId: 'folder-4',
    fileType: 'application/illustrator',
    size: '15.3 MB',
    uploadDate: '2024-01-09',
    downloads: 123,
    views: 456,
    earnings: 61.5,
    status: 'active',
    description: 'Adobe Illustrator file with multiple logo variations',
    category: 'Design & Graphics',
    tags: ['logo', 'illustrator', 'vector', 'branding'],
    isPublic: true,
    preview: '/placeholder.png',
  },

  // Files in Development Resources folder
  {
    id: 'file-6',
    name: 'React Component Library',
    type: 'file',
    parentId: 'folder-2',
    fileType: 'application/zip',
    size: '28.7 MB',
    uploadDate: '2024-01-11',
    downloads: 445,
    views: 1123,
    earnings: 222.5,
    status: 'active',
    description: 'Reusable React components with TypeScript and Storybook',
    category: 'Software & Apps',
    tags: ['react', 'components', 'typescript', 'storybook'],
    isPublic: true,
    preview: '/placeholder.png',
  },
  {
    id: 'file-7',
    name: 'API Documentation.md',
    type: 'file',
    parentId: 'folder-2',
    fileType: 'text/markdown',
    size: '156 KB',
    uploadDate: '2024-01-13',
    downloads: 89,
    views: 234,
    earnings: 44.5,
    status: 'active',
    description: 'Complete API documentation with examples and usage guides',
    category: 'Software & Apps',
    tags: ['api', 'documentation', 'markdown', 'guide'],
    isPublic: true,
    content: '# API Documentation\n\nThis is a comprehensive guide to our API...',
  },

  // Files in Marketing Materials folder
  {
    id: 'file-8',
    name: 'Social Media Templates',
    type: 'file',
    parentId: 'folder-3',
    fileType: 'application/zip',
    size: '67.4 MB',
    uploadDate: '2024-01-07',
    downloads: 789,
    views: 2345,
    earnings: 394.5,
    status: 'active',
    description: 'Instagram, Facebook, and Twitter post templates',
    category: 'Business & Finance',
    tags: ['social media', 'templates', 'instagram', 'facebook'],
    isPublic: true,
    preview: '/placeholder.png',
  },

  // Root level files
  {
    id: 'file-9',
    name: 'Web Templates Bundle',
    type: 'file',
    parentId: null,
    fileType: 'application/zip',
    size: '78.5 MB',
    uploadDate: '2024-01-05',
    downloads: 423,
    views: 1245,
    earnings: 211.5,
    status: 'pending',
    description: 'Collection of responsive web templates for various industries',
    category: 'Design & Graphics',
    tags: ['web', 'templates', 'responsive', 'html', 'css'],
    isPublic: false,
    preview: '/placeholder.png',
  },
  {
    id: 'file-10',
    name: 'Photography Portfolio.jpg',
    type: 'file',
    parentId: null,
    fileType: 'image/jpeg',
    size: '4.2 MB',
    uploadDate: '2024-01-06',
    downloads: 156,
    views: 678,
    earnings: 78.0,
    status: 'active',
    description: 'High-resolution photography portfolio showcase',
    category: 'Photos & Images',
    tags: ['photography', 'portfolio', 'high-res', 'showcase'],
    isPublic: true,
    preview: '/placeholder.png',
  },
];

interface UseFileSystemProps {
  fileSystem: FileItem[];
  currentFolderId: string | null;
  loading: boolean;
  getCurrentFolderContents: () => FileItem[];
  getBreadcrumbPath: () => FileItem[];
  navigateToFolder: (folderId: string | null) => void;
  createFolder: (name: string, description: string) => FileItem;
  updateItem: (id: string, updates: Partial<FileItem>) => void;
  deleteItem: (id: string) => void;
  getFileById: (id: string) => FileItem | undefined;
  searchFiles: (query: string, folderId?: string | null) => FileItem[];
  resetFileSystem: () => void;
}

export function useFileSystem(): UseFileSystemProps {
  const [fileSystem, setFileSystem] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load file system from localStorage or use initial data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFileSystem(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored file system:', error);
        setFileSystem(initialFileSystem);
      }
    } else {
      setFileSystem(initialFileSystem);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever fileSystem changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileSystem));
    }
  }, [fileSystem, loading]);

  // Get current folder contents
  const getCurrentFolderContents = () => {
    return fileSystem.filter((item) => item.parentId === currentFolderId);
  };

  // Get breadcrumb path
  const getBreadcrumbPath = () => {
    const path: FileItem[] = [];
    let currentId = currentFolderId;

    while (currentId) {
      const folder = fileSystem.find((item) => item.id === currentId && item.type === 'folder');
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }

    return path;
  };

  // Navigate to folder
  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  // Create new folder
  const createFolder = (name: string, description: string) => {
    const newFolder: FileItem = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      parentId: currentFolderId,
      uploadDate: new Date().toISOString(),
      status: 'active',
      description,
      category: 'Other',
      tags: [],
      isPublic: true,
    };

    setFileSystem((prev) => [...prev, newFolder]);
    return newFolder;
  };

  // Update file/folder
  const updateItem = (id: string, updates: Partial<FileItem>) => {
    setFileSystem((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  // Delete file/folder
  const deleteItem = (id: string) => {
    // Also delete all children if it's a folder
    const deleteRecursively = (itemId: string) => {
      const children = fileSystem.filter((item) => item.parentId === itemId);
      children.forEach((child) => deleteRecursively(child.id));
      setFileSystem((prev) => prev.filter((item) => item.id !== itemId));
    };

    deleteRecursively(id);
  };

  // Get file by ID
  const getFileById = (id: string) => {
    return fileSystem.find((item) => item.id === id);
  };

  // Search files
  const searchFiles = (query: string, folderId: string | null = null) => {
    return fileSystem.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesFolder = folderId ? item.parentId === folderId : true;

      return matchesQuery && matchesFolder;
    });
  };

  // Reset to initial data (for testing)
  const resetFileSystem = () => {
    setFileSystem(initialFileSystem);
    setCurrentFolderId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    fileSystem,
    currentFolderId,
    loading,
    getCurrentFolderContents,
    getBreadcrumbPath,
    navigateToFolder,
    createFolder,
    updateItem,
    deleteItem,
    getFileById,
    searchFiles,
    resetFileSystem,
  };
}
