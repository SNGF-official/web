import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import ImageTest from '@/assets/product.png';

interface Plant {
  id: number;
  name: string;
  image: string;
}

const plants: Plant[] = [
  { id: 1, name: "Graine de Tournesol", image: ImageTest },
  { id: 2, name: "Basilic Bio", image: ImageTest },
  { id: 3, name: "Menthe Poivrée", image: ImageTest },
  { id: 4, name: "Persil Géant", image: ImageTest },
  { id: 5, name: "Tomate Cerise", image: ImageTest },
];

export const PlantCarousel: React.FC = () => {
  const [, setCurrentIndex] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const carouselRef = useRef<CarouselApi | null>(null);

  const handleSetApi = useCallback((api: CarouselApi) => {
    carouselRef.current = api;
  }, []);

  // Gère les interactions globales pour réinitialiser le timer
  useEffect(() => {
    const updateInteraction = () => { setLastInteractionTime(Date.now()); };

    window.addEventListener("click", updateInteraction);
    window.addEventListener("mousemove", updateInteraction);
    window.addEventListener("touchstart", updateInteraction);

    return () => {
      window.removeEventListener("click", updateInteraction);
      window.removeEventListener("mousemove", updateInteraction);
      window.removeEventListener("touchstart", updateInteraction);
    };
  }, []);

  // Défilement auto après inactivité
  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;

      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteractionTime;

      if (timeSinceLastInteraction > 2000) {
        carouselRef.current.scrollNext();
      }
    }, 3000);

    return () => { clearInterval(interval); };
  }, [lastInteractionTime]);

  // Unique handleSelect
  const handleSelect = useCallback((api?: CarouselApi) => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    setLastInteractionTime(Date.now());
  }, []);

  return (
    <div className="relative bg-[var(--bg-color)] min-h-[20vh] overflow-x-hidden flex flex-col scroll-smooth">
      <Carousel
        setApi={handleSetApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="relative w-full"
        onSelect={() =>
          carouselRef.current && handleSelect(carouselRef.current)
        }
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {plants.map((event, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3 px-4 md:px-6"
            >
              <Card
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:shadow-green-950 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold text-center text-yellow-300">Nos produits les plus recherchés</h3>
                <h3 className="text-xl font-light text-center text-[var(--base-green)]">{event.name}</h3>
                <div className="relative h-60 sm:h-72">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="rounded-t-lg w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="mt-2 text-gray-700">{event.name}</p>
                  </div>
                  <a href="/shop" className="cursor-pointer mt-4 bg-[var(--base-green)] text-white focus:ring-indigo-500 text-center rounded-2xl">
                    <Button className="cursor-pointer">
                      Voir boutique
                    </Button>
                  </a>
              </CardContent>
            </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <CarouselPrevious
            className="bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 focus:ring focus:ring-indigo-300 -ml-6 md:-ml-8"
            size="icon"
            variant="outline"
          />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <CarouselNext
            className="bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 focus:ring focus:ring-indigo-300 -mr-6 md:-mr-8"
            size="icon"
            variant="outline"
          />
        </div>
      </Carousel>
    </div>
  );
};
