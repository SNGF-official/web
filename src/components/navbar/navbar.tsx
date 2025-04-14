import React, { JSX, useEffect, useRef, useState } from 'react';
import LogoImage from '@/assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
}

interface INavbarProps {
  elements: NavItem[];
}
export const NavigationBar: React.FC<INavbarProps> = ({ elements }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setExpanded(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      elements.forEach(({ href }) => {
        const el = document.getElementById(href);
        if (el) {
          sectionRefs.current[href] = el;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, [elements]);

  return (
    <div className="w-full sticky top-0 left-0 backdrop-blur-md bg-white/80 shadow-md z-[50]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="cursor-pointer" onClick={scrollToTop}>
          <img src={LogoImage} alt="Logo" className="w-auto h-12 sm:h-16" />
        </div>

        {/* Burger */}
        <div className="lg:hidden">
          <button
            type="button"
            className="text-gray-800 focus:outline-none"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-10 items-center">
          {elements.map(({ name, href }) => (
            <button
              key={href}
              onClick={() => {
                scrollToSection(href);
              }}
              className={`text-lg font-medium transition-colors ${
                activeSection === href
                  ? 'text-[var(--base-green)] font-semibold underline underline-offset-8 decoration-[var(--base-green)]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <a href={href}>
                {name}
              </a>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {expanded && (
          <motion.nav
            className="fixed top-20 left-0 w-full bg-white shadow-lg z-40 py-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-5">
              {elements.map(({ name, href }) => (
                <button
                  key={href}
                  onClick={() => {
                    scrollToSection(href);
                  }}
                  className={`text-lg font-medium transition-colors ${
                    activeSection === href
                      ? 'text-[var(--base-green)] font-semibold underline underline-offset-8 decoration-[var(--base-green)]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <a href={href}>
                    {name}
                  </a>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};