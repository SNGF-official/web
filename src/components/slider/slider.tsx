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
import { motion, useInView } from "framer-motion";

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

const AnimatedCard: React.FC<{ event: Plant; index: number }> = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
    >
      <Card className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-6 flex flex-col items-center gap-2">
          <h4 className="text-lg font-semibold text-center text-[var(--base-green)]">{event.name}</h4>
          <a href="/shop" className="w-full">
            <Button className="cursor-pointer w-full bg-[var(--base-green)] hover:bg-green-800 transition text-white rounded-full">
              Voir boutique
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};

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
    <div className="relative bg-[var(--bg-color)] min-h-[70vh] h-[70vh] overflow-x-hidden flex flex-col scroll-smooth">
      <h1 className="text-4xl font-bold text-[var(--text-beige)] text-center mb-6 mt-10">
        Nos produits les plus recherchés
      </h1>
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
              <AnimatedCard event={event} index={index} />
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
