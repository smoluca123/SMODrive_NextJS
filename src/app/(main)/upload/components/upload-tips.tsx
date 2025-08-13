import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UploadTips() {
  return (
    <Card className='bg-primary/5 border-primary/20'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <AlertCircle className='h-5 w-5 text-primary' />
          <span>Tips for Success</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-4 text-sm'>
          <div className='space-y-2'>
            <h4 className='font-semibold'>Maximize Your Earnings</h4>
            <ul className='space-y-1 text-muted-foreground'>
              <li>• Use descriptive, searchable titles</li>
              <li>• Add detailed descriptions</li>
              <li>• Include relevant tags</li>
              <li>• Upload high-quality content</li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='font-semibold'>Best Practices</h4>
            <ul className='space-y-1 text-muted-foreground'>
              <li>• Organize files in archives when appropriate</li>
              <li>• Include preview images for design files</li>
              <li>• Provide clear usage instructions</li>
              <li>• Respect copyright and licensing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
