import React from 'react';
import { Button } from '@/components/ui/button';
import ShopImage from '@/assets/banner-shop.png';

const ShopSection: React.FC = () => {
  return (
    <section className="py-50 mt-3 sm:w-full relative w-full flex items-center justify-center min-h-screen sm:pb-16 lg:pb-20 xl:pb-40 bg-[var(--bg-color)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 items-stretch">
          {/* Image Side */}
          <div className="overflow-hidden">
            <img
              src={ShopImage}
              alt="Boutique Holistique"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Side */}
          <div className="text-center md:text-left flex flex-col justify-center">
            <h2 className="max-w-5xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Notre boutique est là pour vous aidez à commander
            </h2>
            <br />
            <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--base-green)] sm:text-5xl">
              Transformez votre jardin
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--base-green)] sm:text-5xl">
              Avec nos milliers de different espèce de flore
            </p>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Explore the transformative power of inner beauty at our Holistic
              Skin & Beauty Lab in Brisbane. Our expert practitioners guide you
              through a personalized journey, combining skincare expertise with
              holistic practices to nurture your inner radiance.
            </p>
            <div className="mt-8 space-x-4">
              <Button
                variant="default"
                size="lg"
                className="cursor-pointer bg-[var(--base-green)] hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Voir boutique
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer border border-[var(--base-green)] text-[var(--base-green)] hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-[var(--base-green)] focus:ring-offset-2 rounded-md shadow-md"
              >
                Explorer les différents espèces
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ShopSection };
