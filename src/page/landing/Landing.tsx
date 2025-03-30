import { JSX } from 'react';
import { HeroSection } from '@/components/hero/hero.tsx';
import { NavigationBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { About } from '@/components/about';
import { EventCarousel } from '@/components/event';
import { ShopSection } from '@/components/shop/shop.tsx';

const Landing = (): JSX.Element => {
  const sections = [
    {
      id: 'hero',
      component: <HeroSection />,
    },
    {
      id: 'A propos',
      component: (
          <About/>
      ),
    },
    {
      id: 'Evenement',
      component: (
        <EventCarousel/>
      ),
    },
    {
      id: 'Boutique',
      component: (
        <ShopSection/>
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
          <div key={section.id} id={section.id} className="w-full">
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Landing };
