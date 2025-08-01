'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

interface UploadFormProps {
  files: File[];
  onSubmit: (formData: FormData) => Promise<void>;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  isPublic: boolean;
  agreeTerms: boolean;
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

export function UploadForm({ files, onSubmit }: UploadFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true,
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error('No files selected', {
        description: 'Please select at least one file to upload.',
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('Terms not accepted', {
        description: 'Please agree to the terms and conditions.',
      });
      return;
    }

    setUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    try {
      await onSubmit(formData);

      toast.success('Upload successful!', {
        description:
          'Your files have been uploaded and are now available for sharing.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: '',
        isPublic: true,
        agreeTerms: false,
      });
    } catch {
      toast.error('Upload failed', {
        description:
          'There was an error uploading your files. Please try again.',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* File Information */}
      <Card>
        <CardHeader>
          <CardTitle>File Information</CardTitle>
          <CardDescription>
            Provide details about your files to help users find them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your files, what they contain, and how they can be used..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas (e.g., design, template, ui)"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
            />
            <p className="text-xs text-muted-foreground">
              Tags help users discover your content. Use relevant keywords.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={formData.isPublic}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublic: checked as boolean,
                }))
              }
            />
            <Label htmlFor="public" className="text-sm">
              Make this file public (recommended for earning)
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  agreeTerms: checked as boolean,
                }))
              }
              required
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I confirm that I have the rights to upload and share these files,
              and I agree to the{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading files...</span>
                <span className="text-sm text-muted-foreground">
                  {uploadProgress}%
                </span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl"
            disabled={uploading || files.length === 0 || !formData.agreeTerms}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload Files
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
