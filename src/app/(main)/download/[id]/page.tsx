import { DownloadClientShell } from './components/download-client-shell';

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const file = {
    id,
    title: 'Ultimate UI Design System 2024',
    uploader: 'Sarah Chen',
    size: '45.2 MB',
  };
  const relatedFiles = [
    {
      id: '1',
      title: 'Mobile App UI Kit',
      image: '/mobile-ui-kit.png',
      downloads: '892',
    },
    {
      id: '2',
      title: 'Icon Pack 2024',
      image: '/generic-icon-pack.png',
      downloads: '1.2k',
    },
    {
      id: '3',
      title: 'Web Templates Bundle',
      image: '/placeholder-kbqqq.png',
      downloads: '654',
    },
  ];
  return <DownloadClientShell file={file} relatedFiles={relatedFiles} />;
}
