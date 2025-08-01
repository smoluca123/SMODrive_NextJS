import { UploadHeader } from './components/upload-header';
import { UploadContainer } from './components/upload-container';
import { UploadTips } from './components/upload-tips';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <UploadHeader />
          <UploadContainer />
          <UploadTips />
        </div>
      </div>
    </div>
  );
}
