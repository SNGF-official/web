import { JSX } from 'react';
import { HeroSection } from '@/components/hero/hero.tsx';
import { NavigationBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { UseScreenSize } from '@/hooks/useScreenContext';

const Landing = (): JSX.Element => {
  const { isMobile, isTablet, isDesktop } = UseScreenSize();

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
          className={`w-full flex items-center justify-center min-h-screen ${isMobile ? 'bg-green-400' : 'bg-green-500'} text-white text-3xl`}
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
          className={`w-full flex items-center justify-center min-h-screen ${isTablet ? 'bg-red-600' : 'bg-red-500'} text-white text-3xl`}
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
          className={`w-full flex items-center justify-center min-h-screen ${isDesktop ? 'bg-blue-800' : 'bg-blue-700'} text-white text-3xl`}
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
    <div className="relative bg-[var(--bg-color)] h-screen overflow-x-hidden flex flex-col scroll-smooth">
      <NavigationBar/>
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
