import { DownloadClientShell } from './components/download-client-shell';
import {
  getDownloadSessionAPI,
  getFileDetailAPI,
} from '@/lib/apis/storage-apis';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: fileId } = await params;
  const cookieStore = await cookies();
  const downloadSessionId = cookieStore.get('download-session')?.value;
  if (!downloadSessionId) {
    redirect('/file/' + fileId);
  }
  try {
    const downloadSessionData = await getDownloadSessionAPI({
      id: downloadSessionId,
    });
    const { data: fileData } = await getFileDetailAPI({ id: fileId });
    if (!fileData || downloadSessionData.data.fileId !== fileId) {
      redirect('/file/' + fileId);
    }
    return <DownloadClientShell file={fileData} relatedFiles={relatedFiles} />;
  } catch (error) {
    console.log(error);
    redirect('/file/' + fileId);
  }

  // const file = {
  //   id,
  //   title: 'Ultimate UI Design System 2024',
  //   uploader: 'Sarah Chen',
  //   size: '45.2 MB',
  // };
  // const relatedFiles = [
  //   {
  //     id: '1',
  //     title: 'Mobile App UI Kit',
  //     image: '/mobile-ui-kit.png',
  //     downloads: '892',
  //   },
  //   {
  //     id: '2',
  //     title: 'Icon Pack 2024',
  //     image: '/generic-icon-pack.png',
  //     downloads: '1.2k',
  //   },
  //   {
  //     id: '3',
  //     title: 'Web Templates Bundle',
  //     image: '/placeholder-kbqqq.png',
  //     downloads: '654',
  //   },
  // ];
  // return <DownloadClientShell file={fileData} relatedFiles={relatedFiles} />;
}
