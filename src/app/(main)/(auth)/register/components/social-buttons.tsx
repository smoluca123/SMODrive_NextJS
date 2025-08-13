import { Button } from '@/components/ui/button';
import { Chrome, Github } from 'lucide-react';

export function SocialButtons() {
  return (
    <div className='space-y-3'>
      <Button variant='outline' className='w-full bg-transparent' type='button'>
        <Chrome className='mr-2 h-4 w-4' />
        Continue with Google
      </Button>
      <Button variant='outline' className='w-full bg-transparent' type='button'>
        <Github className='mr-2 h-4 w-4' />
        Continue with GitHub
      </Button>
    </div>
  );
}
