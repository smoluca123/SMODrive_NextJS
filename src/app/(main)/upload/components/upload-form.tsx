'use client';
'use no memo';

import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { UploadStatus } from '@/hooks/use-file-upload/mutations';
import {
  uploadFileSchema,
  UploadFileSchema,
} from '@/lib/zod-schemas/upload-file.schema';
import InputTags from '@/components/ui/input-tags';
import { Tag } from 'emblor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';

interface UploadFormProps {
  file: File | null;
  onSubmit: (formData: UploadFileSchema) => Promise<void>;
  uploadProgress: number;
  uploadStatus: UploadStatus;
}

export function UploadForm({
  file,
  onSubmit,
  uploadProgress,
  uploadStatus,
}: UploadFormProps) {
  const form = useForm<UploadFileSchema>({
    defaultValues: {
      description: '',
      tags: [],
      isPublic: true,
      agreeTerms: false,
    },
    mode: 'onTouched',
    resolver: zodResolver(uploadFileSchema),
  });

  const agreeTerms = form.watch('agreeTerms');
  const isPublic = form.watch('isPublic');

  const handleSubmit = async (data: UploadFileSchema) => {
    if (!file) {
      toast.error('No files selected', {
        description: 'Please select at least one file to upload.',
      });
      return;
    }

    if (!data.agreeTerms) {
      toast.error('Terms not accepted', {
        description: 'Please agree to the terms and conditions.',
      });
      return;
    }

    // Simulate upload progress
    // for (let i = 0; i <= 100; i += 10) {
    //   setUploadProgress(i);
    //   await new Promise((resolve) => setTimeout(resolve, 200));
    // }

    try {
      await onSubmit(data);
      // console.log(data);

      // Reset form
      form.reset();
    } catch {
      toast.error('Upload failed', {
        description:
          'There was an error uploading your files. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* File Information */}
        <Card>
          <CardHeader>
            <CardTitle>File Information</CardTitle>
            <CardDescription>
              Provide details about your files to help users find them
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe your files, what they contain, and how they can be used..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="space-y-2">
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
          </div> */}

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              {/* <Input
              id="tags"
              placeholder="Enter tags separated by commas (e.g., design, template, ui)"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
            /> */}
              <InputTags
                tags={form.watch('tags')}
                setTags={(tags) => {
                  console.log(tags);
                  form.setValue('tags', tags as Tag[]);
                }}
                placeholder="Add a tag"
                activeTagIndex={null}
                setActiveTagIndex={() => {}}
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
                checked={isPublic}
                onCheckedChange={(checked) =>
                  form.setValue('isPublic', checked as boolean)
                }
              />
              <Label htmlFor="public" className="text-sm">
                Make this file public (recommended for earning)
              </Label>
            </div>

            <div className="flex flex-col gap-x-4 md:flex-row ">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) =>
                    form.setValue('agreeTerms', checked as boolean)
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I confirm that I have the rights to upload and share these
                  files, and I agree to the{' '}
                </Label>
              </div>
              <div className="text-sm leading-relaxed ">
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Uploading files...
                  </span>
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
              disabled={uploadStatus === 'uploading' || !file || !agreeTerms}
            >
              {uploadStatus === 'uploading' ? (
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
    </Form>
  );
}
