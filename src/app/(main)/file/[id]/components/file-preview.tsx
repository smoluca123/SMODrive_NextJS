import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilePreviewProps {
  preview: string;
}

export function FilePreview({ preview }: FilePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={preview || '/placeholder.svg'}
            alt="File preview"
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
