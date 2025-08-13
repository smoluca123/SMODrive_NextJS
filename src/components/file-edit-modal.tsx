'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, Plus, FileText } from 'lucide-react';
import { toast } from 'sonner';
import type { FileItem } from '@/hooks/use-file-system';

interface FileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: FileItem | null;
  onSave: (id: string, updates: Partial<FileItem>) => void;
}

const categories = [
  'Design & Graphics',
  'Software & Apps',
  'Documents & Templates',
  'Audio & Music',
  'Video & Animation',
  'Photos & Images',
  'Games & Entertainment',
  'Education & Learning',
  'Business & Finance',
  'Other',
];

export function FileEditModal({ open, onOpenChange, file, onSave }: FileEditModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: [] as string[],
    isPublic: true,
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when file changes
  useEffect(() => {
    if (file) {
      setFormData({
        name: file.name,
        description: file.description,
        category: file.category,
        tags: [...file.tags],
        isPublic: file.isPublic,
      });
    }
  }, [file]);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSave(file.id, formData);

    toast.success('File updated successfully', {
      description: 'Your file information has been saved.',
    });

    setIsLoading(false);
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Edit {file.type === 'folder' ? 'Folder' : 'File'}
          </DialogTitle>
          <DialogDescription>
            Update your {file.type === 'folder' ? 'folder' : 'file'} information and settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{file.type === 'folder' ? 'Folder' : 'File'} Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={`Enter ${file.type} name`}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder={`Describe your ${file.type}...`}
                rows={3}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Tags</Label>
              <div className='flex flex-wrap gap-2 mb-2'>
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant='secondary' className='flex items-center gap-1'>
                    {tag}
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='h-4 w-4 p-0 hover:bg-transparent'
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className='flex gap-2'>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder='Add a tag'
                  onKeyPress={handleKeyPress}
                />
                <Button type='button' variant='outline' onClick={handleAddTag}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='public'
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPublic: checked as boolean,
                  }))
                }
              />
              <Label htmlFor='public' className='text-sm'>
                Make this {file.type} public
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
