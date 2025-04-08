import HeroImage from '@/assets/logo.png';
import SVGWaveTop from '@/assets/svg/top.svg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full flex items-center justify-center min-h-screen sm:pb-16 lg:pb-20 xl:pb-40 bg-[var(--bg-green)] overflow-hidden">
      {/* Vague en bas */}
      <img
        src={SVGWaveTop}
        alt="Vague du haut"
        className="absolute top-0 left-0 w-full **w-1/2** h-auto"
        style={{ fill: 'white' }}
      />
      {/* Contenu principal */}
      <div className="px-4 mx-auto w-screen sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Image à gauche */}
          <div className="md:w-1/2">
            <img
              className="w-full **w-1/2** max-w-xs mx-auto md:max-w-lg xl:max-w-xl object-cover"
              src={HeroImage}
              alt="Hero Illustration"
            />
          </div>

          {/* Texte à droite */}
          <div className="md:w-1/2 max-w-4xl">
            <p className="text-sm font-normal tracking-widest text-gray-400 uppercase">
              <br />
            </p>
            <h1 className="text-[var(--base-green)] mt-1 text-4xl font-normal sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
              <span className="text-[var(--base-green)] sm:text-[var(--base-green)] md:text-[var(--base-green)] lg:text-[var(--base-green)]">
                SILO
              </span>
              {' '}
              NATIONAL
              {' '}
              DES GRAINES FORESTIÈRES
            </h1>
            <p className="max-w-lg mt-6 top-20 text-xl font-normal text-gray-300 sm:mt-8">
              Le SNGF est une institution malgache dédiée à la conservation,
              la production, et la diffusion de semences forestières de qualité.
              Nous œuvrons pour la restauration des écosystèmes forestiers, la
              préservation de la biodiversité, et le soutien aux initiatives
              de reboisement à travers tout Madagascar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
