import { JSX } from 'react';
import { HeroSection } from '@/components/hero/hero.tsx';
import { NavigationBar } from '@/components/navbar';
import { FeedbackSection, Footer } from '@/components/footer';
import { About } from '@/components/about';
import { EventCarousel } from '@/components/event';
import { ShopSection } from '@/components/shop/shop.tsx';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQSection } from '@/components/faq';
import { PlantCarousel } from '@/components/slider/slider.tsx';

const Landing = (): JSX.Element => {
  const sections = [
    {
      id: 'hero',
      component: <HeroSection />,
    },
    {
      id: 'slider',
      component: <PlantCarousel />,
    },
    {
      id: 'A propos',
      component: <About />,
    },
    {
      id: 'Evenement',
      component: <EventCarousel />,
    },
    {
      id: 'Boutique',
      component: <ShopSection />,
    },
    {
      id: 'FAQ',
      component: <FAQSection/>,
    },
    {
      id: 'testimony',
      component: <FeedbackSection />,
    },
    {
      id: 'footer',
      component: <Footer />,
    },
  ];
  const navList = [
    { name: 'A propos', href: '#A propos' },
    { name: 'Evenement', href: '#Evenement' },
    { name: 'Boutique', href: '/shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '#FAQ' },
  ];

  return (
    <div className="relative bg-[var(--bg-color)] h-screen overflow-x-hidden flex flex-col scroll-smooth">
      <NavigationBar elements={navList}/>
      <div className="flex flex-col flex-grow">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="w-full h-full">
            {section.component}
          </div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50 bg-[var(--base-green)] hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <ShoppingCart size={20} />
        <a href="/shop">
          Voir boutique
        </a>
      </motion.button>
    </div>
  );
};

export { Landing };