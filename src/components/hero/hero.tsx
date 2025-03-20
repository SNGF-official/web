import HeroImage from '@/assets/home.png';
import { NavigationBar } from '@/components/navbar/navbar.tsx';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-700 to-green-900">
      {/* Background Blurry Effects */}
      <div className="w-64 h-64 bg-purple-500 rounded-full blur-3xl -z-0 opacity-50 absolute top-1/3 left-1/4"></div>
      <div className="w-64 h-64 bg-green-500 rounded-full blur-2xl -z-0 opacity-60 absolute right-1/4 bottom-1/4"></div>

      <NavigationBar />

      {/* Hero Section */}
      <section className="py-33 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">
            {/* Texte Principal */}
            <div className="lg:w-2/3">
              <p className="text-sm font-normal tracking-widest text-gray-400 uppercase">
                L'Union Européenne vous présente,
              </p>
              <h1 className="mt-6 text-4xl font-normal text-white sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                  SILO NATIONAL
                </span>{' '}
                DES GRAINES FORESTIÈRES
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
                  Start Exploring Inspiration
                </a>
              </div>

              {/* Statistiques */}
              <div>
                <div className="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
                  <span className="ml-2 text-base font-normal text-gray-300">
                    {' '}
                    42 new design inspiration was added last week{' '}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Hero */}
            <div className="mt-8 md:absolute md:mt-0 md:top-32 lg:top-0 md:right-[-70px] lg:right-[-100px]">
              <img
                className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl"
                src={HeroImage}
                alt="Hero Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { HeroSection };
