import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedFile {
  title: string;
  downloads: string;
  image: string;
}

interface RelatedFilesProps {
  files: RelatedFile[];
}

export function RelatedFiles({ files }: RelatedFilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Files</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {files.map((relatedFile, index) => (
          <div
            key={index}
            className='flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer'
          >
            <img
              src={relatedFile.image || '/placeholder.svg'}
              alt={relatedFile.title}
              className='h-12 w-12 rounded-lg object-cover'
            />
            <div className='flex-1 min-w-0'>
              <p className='font-medium text-sm truncate'>{relatedFile.title}</p>
              <p className='text-xs text-muted-foreground'>{relatedFile.downloads} downloads</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
