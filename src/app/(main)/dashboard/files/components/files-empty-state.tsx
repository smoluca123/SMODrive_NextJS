import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, FolderPlus, Upload } from 'lucide-react';

interface FilesEmptyStateProps {
  searchQuery: string;
  onCreateFolder: () => void;
  onUpload: () => void;
}

export function FilesEmptyState({
  searchQuery,
  onCreateFolder,
  onUpload,
}: FilesEmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-8 sm:p-12 text-center">
        <div className="space-y-4">
          <Folder className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">No files found</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'This folder is empty'}
            </p>
          </div>
          {!searchQuery && (
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                onClick={onCreateFolder}
                className="w-full sm:w-auto"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Create Folder
              </Button>
              <Button className="w-full sm:w-auto" onClick={onUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
