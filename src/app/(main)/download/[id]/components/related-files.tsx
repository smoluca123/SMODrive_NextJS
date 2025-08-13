import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface RelatedFile {
  id: string;
  title: string;
  image: string;
  downloads: string;
}

interface RelatedFilesProps {
  files: RelatedFile[];
}

export function RelatedFiles({ files }: RelatedFilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You might also like</CardTitle>
        <CardDescription>More amazing files from our community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-3 gap-6'>
          {files.map((relatedFile) => (
            <Link key={relatedFile.id} href={`/file/${relatedFile.id}`} className='group'>
              <Card className='border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                <CardContent className='p-4 space-y-3'>
                  <img
                    src={relatedFile.image || '/placeholder.svg'}
                    alt={relatedFile.title}
                    className='w-full h-32 object-cover rounded-lg'
                  />
                  <div className='space-y-2'>
                    <h3 className='font-semibold text-sm group-hover:text-primary transition-colors'>
                      {relatedFile.title}
                    </h3>
                    <div className='flex items-center justify-between'>
                      <Badge variant='secondary' className='text-xs'>
                        {relatedFile.downloads} downloads
                      </Badge>
                      <div className='flex items-center space-x-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
