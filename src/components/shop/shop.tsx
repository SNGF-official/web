import React from 'react';
import { Button } from '@/components/ui/button';
import ShopImageSeed from '@/assets/nuts.png';
import ShopImagePlant from '@/assets/plantes.png';

const ShopSection: React.FC = () => {
  return (
    <section className="py-20 mt-3 w-full flex items-center justify-center bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="group relative hover:cursor-pointer overflow-hidden rounded-xl shadow-lg">
          <img
            src={ShopImageSeed}
            alt="Illustration botanique"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-[var(--base-green)] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="text-white text-lg font-semibold select-none">
              <a href="/shop">
                Voir la boutique
              </a>
          </span>
        </div>
      </div>

      <div className="group relative hover:cursor-pointer overflow-hidden rounded-xl shadow-lg">
          <img
            src={ShopImagePlant}
            alt="Illustration botanique"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-[var(--base-green)] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="text-white text-lg font-semibold select-none">
              <a href="/shop">
                Voir la boutique
              </a></span>
          </div>
        </div>

        <div className="text-center md:text-center w-screen max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            🌿 Notre univers végétal vous accueil aussi 🌿
          </h2>
          <p className="mt-4 text-2xl sm:text-3xl font-semibold text-[var(--base-green)] leading-snug">
            Transformez votre espace avec nos graines, plantes et semences rares
          </p>
          <p className="mt-4 text-gray-600 text-base sm:text-lg text-center md:text-center leading-relaxed max-w-7xl">
            Découvrez une sélection exceptionnelle d'espèces botaniques venues des quatre coins du monde.
            Embellissez votre jardin, purifiez votre intérieur ou lancez votre potager bio en toute sérénité.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
            <Button
              className="cursor-pointer  bg-[var(--base-green)] hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-200"
            >
              <a href="/shop">
                🌱 Voir la boutique
              </a>
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer border-[var(--base-green)] text-[var(--base-green)] hover:bg-green-50 px-6 py-3 rounded-full font-semibold transition-all duration-200"
            >
              <a href="/shop">
                🔍 Explorer les espèces
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ShopSection };
