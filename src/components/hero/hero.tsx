import HeroImage from '@/assets/logo.png';
import RideauHaut from '@/assets/rideau-haut.png';
import RideauBas from '@/assets/rideau-bas.png';
import SVGWaveTop from '@/assets/svg/top.svg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => { clearTimeout(timer); };
  }, []);

  return (
    <section className="relative w-full flex items-center justify-center min-h-[70vh] bg-[var(--bg-green)] overflow-hidden">

      {/* Vague en haut */}
      <img
        src={SVGWaveTop}
        alt="Vague du haut"
        className="absolute top-0 left-0 w-full h-auto z-0"
        style={{ fill: 'white' }}
      />

      {/* Rideau du haut */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-1/2 z-20"
      >
        <img
          src={RideauHaut}
          alt="Rideau haut"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Rideau du bas */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 5, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-full h-1/2 z-20"
      >
        <img
          src={RideauBas}
          alt="Rideau bas"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Contenu principal */}
      <div className="relative z-10 px-4 mx-auto w-screen sm:px-6 lg:px-8">
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-10"
          >
            {/* Image à gauche */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 720 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="md:w-1/2"
              style={{ perspective: 1000 }}
            >
              <motion.img
                src={HeroImage}
                alt="Hero Illustration"
                className="w-full max-w-xs mx-auto md:max-w-lg xl:max-w-xl object-contain drop-shadow-[0_0_60px_rgba(34,197,94,0.3)]"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </motion.div>

            {/* Texte à droite */}
            <div className="md:w-1/2 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
              >
                <h1 className="text-[var(--base-green)] mt-1 text-4xl font-normal sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
                  <span className="text-[var(--base-green)]">SILO</span>{' '}
                  NATIONAL DES GRAINES FORESTIÈRES
                </h1>
                <p className="max-w-lg mt-6 text-xl font-normal text-gray-300 sm:mt-8">
                  Le SNGF est une institution malgache dédiée à la conservation,
                  la production, et la diffusion de semences forestières de qualité.
                  Nous œuvrons pour la restauration des écosystèmes forestiers,
                  la préservation de la biodiversité, et le soutien aux initiatives
                  de reboisement à travers tout Madagascar.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export { HeroSection };
