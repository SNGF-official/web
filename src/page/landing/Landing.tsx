import { JSX } from 'react';
import { HeroSection } from '@/components/hero/hero.tsx';
import { NavigationBar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const Landing = (): JSX.Element => {
  const sections = [
    {
      id: 'hero',
      component: <HeroSection />,
    },
    {
      id: 'about',
      component: (
        <div
          id="A propos"
          className="w-full flex items-center justify-center h-[100vh] bg-green-500 text-white text-3xl"
        >
          À Propos
        </div>
      ),
    },
    {
      id: 'events',
      component: (
        <div
          id="Evenements"
          className="w-full flex items-center justify-center h-[100vh] bg-red-500 text-white text-3xl"
        >
          Liste Événements
        </div>
      ),
    },
    {
      id: 'boutique',
      component: (
        <div
          id="Boutique"
          className="w-full flex items-center justify-center h-[100vh] bg-blue-800 text-white text-3xl"
        >
          Boutique
        </div>
      ),
    },
    {
      id: 'footer',
      component: <Footer />,
    },
  ];

  return (
    <div className="relative bg-[var(--bg-color)] h-screen overflow-y-auto flex flex-col scroll-smooth">
      <NavigationBar />
      <div className="flex flex-col flex-grow">
        {sections.map((section) => (
          <div key={section.id} className="w-full">
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Landing };
