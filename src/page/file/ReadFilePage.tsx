import { useParams } from 'react-router-dom';
import { ViewFile } from '@/components/file/readFile.tsx';
import { NavigationBar } from '@/components/navbar';

const ReadFilePage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navList = [
    { name: 'A propos', href: '/home' },
    { name: 'Evenement', href: '/home#Evenement' },
    { name: 'Boutique', href: '/shop' },
    { name: 'FAQ', href: '#FAQ' },
  ];
  return (
    <div className="relative bg-[var(--bg-color)] h-screen overflow-x-hidden overflow-y-hidden flex flex-col">
      <NavigationBar elements={navList} />
      <ViewFile fileId={fileId} />
    </div>
  );
};

export { ReadFilePage };
