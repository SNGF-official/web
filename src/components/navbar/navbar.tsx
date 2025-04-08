import React, { JSX, useState } from 'react';
import LogoImage from '@/assets/logo.png';

export const NavigationBar: React.FC = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const navList = ['A propos', 'Evenement', 'Boutique', 'FAQ', 'Blog'];

  const handleToggleMenuBurger = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div className="w-full sticky top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="shrink-0">
          <a href="/home" title="Logo" className="flex">
            <img src={LogoImage} alt="Logo" className="w-auto h-16" />
          </a>
        </div>

        {/* Menu Burger (Mobile) */}
        <div className="flex lg:hidden">
          {' '}
          {/* Rendre visible jusqu'à la taille lg */}
          <button
            type="button"
            className="text-gray-800 focus:outline-none"
            onClick={handleToggleMenuBurger}
            aria-expanded={expanded}
          >
            {expanded ? (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex md:items-center md:space-x-12">
          {' '}
          {/* Cacher jusqu'à la taille lg */}
          {navList.map((item) => (
            item == 'Boutique' ? <a
              key={item}
              href={"/shop"}
              className="text-base font-normal text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              {item}
            </a> : <a
              key={item}
              href={'#' + item}
              className="text-base font-normal text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Menu Mobile */}
      {expanded && (
        <nav className="lg:hidden bg-white shadow-lg">
          {' '}
          {/* Visible uniquement jusqu'à la taille lg */}
          <div className="flex flex-col items-center py-4 space-y-4">
            {navList.map((item) => (
              <a
                key={item}
                href={'#' + item}
                className="text-base font-normal text-gray-600 transition-all duration-200 hover:text-gray-900"
                onClick={handleToggleMenuBurger}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};
