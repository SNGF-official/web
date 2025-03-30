import HeroImage from '@/assets/logo.png';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full flex items-center justify-center h-[100vh] sm:pb-16 lg:pb-20 xl:pb-40 bg-[var(--bg-color)]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative">
          {/* Texte Principal */}
          <div className="lg:w-1/2">
            <p className="text-sm font-normal tracking-widest text-gray-400 uppercase">
              L'Union Européenne vous présente,
            </p>
            <h1 className="text-[var(--base-green)] mt-6 text-4xl font-normal sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
              <span className="text-black">SILO NATIONAL</span> DES GRAINES
              FORESTIÈRES
            </h1>
            <p className="max-w-lg mt-4 text-xl font-normal text-gray-300 sm:mt-8">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat.
            </p>

            {/* Bouton */}
            <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-green-900 border border-transparent rounded-full"
                role="button"
              >
                Commencer la visite
              </a>
            </div>
          </div>
          {/* Image Hero */}
          <div className="mt-8 md:absolute md:mt-0 md:top-32 lg:top-0 md:right-[-70px] lg:right-[-100px] lg:w-1/2">
            <img
              className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl"
              src={HeroImage}
              alt="Hero Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
