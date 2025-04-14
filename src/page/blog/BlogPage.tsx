import { NavigationBar } from '@/components/navbar';
import { Blog } from '@/components/blog';

const BlogPage = () => {

  const navList = [
    { name: 'A propos', href: '/home#A propos' },
    { name: 'Evenement', href: '/home#Evenement' },
    { name: 'Boutique', href: '/shop' },
    { name: 'FAQ', href: '/home#FAQ' },
  ];

  return (
    <>
      <NavigationBar elements={navList}/>
    <div className="relative min-h-screen bg-white flex">
      <Blog />
    </div>
    </>
  );
};

export { BlogPage };
