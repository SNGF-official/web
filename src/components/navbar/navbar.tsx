import React, { JSX, useState } from 'react';
import LogoImage from '@/assets/logo.png';

export const NavigationBar: React.FC = (): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const navList = ['Products', 'Features', 'Pricing', 'Support'];
  return (
    <>
      <header className="w-full py-4 sm:py-6 fixed bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md opacity-80">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <a href="#" title="Logo" className="flex">
                <img src={LogoImage} alt="Logo" className="w-auto h-16" />
              </a>
            </div>

            {/* Menu Burger (Mobile) */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-white"
                onClick={() => {
                  setExpanded(!expanded);
                }}
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
            <nav className="hidden md:flex md:items-center md:justify-end md:space-x-12">
              {navList.map((item) => (
                <a
                  key={item}
                  href={'#' + item}
                  className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Menu Mobile */}
          {expanded && (
            <nav className="mt-4 md:hidden">
              <div className="flex flex-col pt-8 pb-4 space-y-6">
                {navList.map((item) => (
                  <a
                    key={item}
                    href={'#' + item}
                    className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};
