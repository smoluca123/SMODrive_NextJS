'use client';
'use no memo';

import { useState } from 'react';
import {
  Upload,
  X,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatFileSize } from '@/lib/utils';

interface FileUploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileUploadZone({ file, onFileChange }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/'))
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    if (type.startsWith('video/'))
      return <Video className="h-6 w-6 text-purple-500" />;
    if (type.startsWith('audio/'))
      return <Music className="h-6 w-6 text-green-500" />;
    if (type.includes('zip') || type.includes('rar'))
      return <Archive className="h-6 w-6 text-orange-500" />;
    return <FileText className="h-6 w-6 text-gray-500" />;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onFileChange(droppedFiles[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFileChange(selectedFiles[0]);
    }
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Files</CardTitle>
        <CardDescription>
          Drag and drop your files here or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Drop your files here, or{' '}
                <label className="text-primary cursor-pointer hover:underline">
                  browse
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </p>
              <p className="text-sm text-muted-foreground">
                Supports all file types • Max 100MB per file
              </p>
            </div>
          </div>
        </div>

        {/* Selected Files */}
        {file && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Selected Files ({file.name})</h3>
            <div className="space-y-2">
              <div
                key={file.name}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile()}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
