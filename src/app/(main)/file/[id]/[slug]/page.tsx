import { FileHeader } from './components/file-header';
import { FilePreview } from './components/file-preview';
import { DownloadSection } from './components/download-section';
import { FileStats } from './components/file-stats';
import { RelatedFiles } from './components/related-files';
import { SocialShare } from './components/social-share';
import { CommentsSection } from './components/comments-section';
import { ReportButton } from './components/report-button';
import { BannerAd, SkyscraperAd } from '@/components/ads';
import { getFileDetailAPI } from '@/lib/apis/storage-apis';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const { data } = await getFileDetailAPI({ id });

    return {
      title: `${data.originalName.split('.')[0]} Free Download | ShareEarn`,
      description: data.description,
      openGraph: {
        title: `${data.originalName.split('.')[0]} Free Download`,
        description: data.description,
      },
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export default async function FileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let fileData;
  try {
    fileData = (await getFileDetailAPI({ id })).data;
  } catch {
    notFound();
  }

  // Mock file data
  const file = {
    id: id,
    title: 'Ultimate UI Design System 2024',
    description:
      'A comprehensive design system with 500+ components, icons, and templates. Perfect for modern web and mobile applications. Includes Figma files, Sketch files, and Adobe XD files.',
    uploader: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
    },
    size: '45.2 MB',
    type: 'ZIP Archive',
    uploadDate: '2024-01-15',
    downloads: 1247,
    views: 3891,
    tags: ['UI Design', 'Design System', 'Figma', 'Templates', 'Components'],
    preview: '/design-system-preview.png',
  };

  const comments = [
    {
      user: 'Mike Johnson',
      avatar: '/placeholder.svg?height=32&width=32',
      comment: 'Amazing design system! Really helped speed up my workflow.',
      time: '2 hours ago',
      likes: 5,
    },
    {
      user: 'Emma Wilson',
      avatar: '/placeholder.svg?height=32&width=32',
      comment: 'The components are so well organized. Worth every penny!',
      time: '1 day ago',
      likes: 3,
    },
  ];

  const relatedFiles = [
    {
      title: 'Mobile App UI Kit',
      downloads: '892',
      image: '/mobile-ui-kit.png',
    },
    {
      title: 'Icon Pack 2024',
      downloads: '1.2k',
      image: '/generic-icon-pack.png',
    },
    {
      title: 'Web Templates Bundle',
      downloads: '654',
      image: '/placeholder-kbqqq.png',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            <FileHeader file={fileData} />

            <BannerAd size='medium' />

            <FilePreview preview={file.preview} />

            <DownloadSection fileId={file.id} />

            <SocialShare fileId={file.id} fileTitle={file.title} />

            <CommentsSection comments={comments} />
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <SkyscraperAd />

            <FileStats
              views={fileData.downloadCount}
              downloads={fileData.downloadCount}
              rating={4.9}
            />

            <ReportButton />

            <RelatedFiles files={relatedFiles} />
          </div>
        </div>

        {/* Bottom Native Ad */}
        <div className='mt-12'>
          {/* <AdBanner type="native" /> */}
          <BannerAd size='medium' />
        </div>
      </div>
    </div>
  );
}
