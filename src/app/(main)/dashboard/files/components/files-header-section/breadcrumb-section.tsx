import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFolderStore } from '@/hooks/zustand/useFolder';
import { ArrowLeft } from 'lucide-react';

export function BreadcrumbSection() {
  const { selectedFolders, resetSelectedFolders } = useFolderStore();
  return (
    <Card>
      <CardContent className='p-3 sm:p-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0'>
          <BreadcrumbNavigation />
          {selectedFolders.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => {
                resetSelectedFolders();
              }}
              className='self-start sm:self-auto'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Root
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
