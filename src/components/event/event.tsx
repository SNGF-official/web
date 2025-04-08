import { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button.tsx';
import ImageTest from '@/assets/product.png'; // Placeholder image

const events = [
  {
    title: 'Foire Agricole 2025 - L’innovation au cœur de la terre',
    image: ImageTest,
    date: '15 Avril 2025',
    description: 'Participez à l’événement agricole de l’année ! Drones, serres connectées, et semences bio au rendez-vous.',
    link: '#',
  },
  {
    title: 'Conférence Nationale sur l’Écologie Durable',
    image: ImageTest,
    date: '20 Mai 2025',
    description: 'Rencontrez chercheurs et agriculteurs autour des solutions pour une agriculture respectueuse de l’environnement.',
    link: '#',
  },
  {
    title: 'Marché Bio Local – Saveurs & Savoir-faire',
    image: ImageTest,
    date: '5 Juin 2025',
    description: 'Fruits, légumes, produits transformés : tout droit du producteur au consommateur. Venez goûter local.',
    link: '#',
  },
  {
    title: 'Atelier “Plante Ton Avenir”',
    image: ImageTest,
    date: '12 Juillet 2025',
    description: 'Initiez-vous à la plantation avec des spécialistes du reboisement. Repartez avec votre propre plant !',
    link: '#',
  },
  {
    title: 'Expo Fleurs & Arbres – Festival Vert',
    image: ImageTest,
    date: '25 Août 2025',
    description: 'Une immersion dans un jardin géant. Vente d’arbres rares, concours floral, ateliers DIY verts.',
    link: '#',
  },
];

export function EventCarousel() {
  const [, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const carouselRef = useRef<CarouselApi | null>(null);

  const handleSetApi = useCallback((api: CarouselApi) => {
    carouselRef.current = api;
  }, []);

  useEffect(() => {
    if (isUserInteracting || !carouselRef.current) return;

    const interval = setInterval(() => {
      carouselRef.current?.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isUserInteracting, carouselRef]);

  const handleSelect = useCallback((api?: CarouselApi) => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    setIsUserInteracting(false);
  }, []);

  return (
    <div className="h-[100vh] relative w-full flex flex-col justify-center items-center py-16 sm:py-24 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Événements à venir
        </h2>
        <p className="mt-3 text-lg text-gray-500 sm:mt-4">
          Ne manquez pas nos prochains événements passionnants.
        </p>
      </div>
      <div className="relative w-full max-w-7xl mx-auto">
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
            {events.map((event, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3 px-4 md:px-6"
              >
                <Card className="bg-white rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-green-950 transition-shadow duration-300">
                  <div className="relative h-60 sm:h-72">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="rounded-t-lg w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--base-green)]">{event.title}</h3>
                      <p className="mt-2 text-gray-700">{event.description}</p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      📅 {event.date}
                    </div>
                    <Button
                      className="cursor-pointer mt-4 bg-[var(--base-green)] text-white focus:ring-indigo-500"
                      onClick={() => (window.location.href = event.link)}
                    >
                      En savoir plus
                    </Button>
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
    </div>
  );
}
