import { useState, useEffect } from 'react';

export const UseScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  return {
    isMobile: screenWidth <= 767,
    isTablet: screenWidth >= 768 && screenWidth <= 1023,
    isDesktop: screenWidth >= 1024,
  };
};
