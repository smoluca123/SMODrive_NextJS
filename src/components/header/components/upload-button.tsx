'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function UploadButton() {
  return (
    <Button asChild className="hidden sm:flex rounded-2xl">
      <Link href="/upload">
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Link>
    </Button>
  );
}
