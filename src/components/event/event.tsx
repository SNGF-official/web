import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type Event, EventSortBy } from '@/lib';
import { Event as ApiEvent } from 'generated-client/models/Event';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button.tsx';
import { EventFilters } from '@/components/eventFilter.tsx';
import { useEvent } from '@/hooks/useEvent';

const transformApiEventToUIEvent = (ev: ApiEvent): Event => {
  return {
    title: ev.title,
    description: ev.description ?? '',
    image: ev.imageUrl ?? '',
    date: new Date(ev.date).toLocaleDateString(),
    link: `/events/${ev.id}`,
  };
};

export function EventCarousel() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<EventSortBy>('date-asc');
  const [, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const carouselRef = useRef<CarouselApi | null>(null);

  const { events, loading, error } = useEvent({
    keyword: search,
    sort_by: sortBy.includes('title') ? (sortBy.endsWith('asc') ? 'asc' : 'desc') : undefined,
  });


  const displayedEvents = useMemo(() => {
    return events.map((ev: ApiEvent) => transformApiEventToUIEvent(ev));
  }, [events]);

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
  }, [isUserInteracting]);

  const handleSelect = useCallback((api?: CarouselApi) => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    setIsUserInteracting(false);
  }, []);

  return (
    <div className="h-[100vh] relative w-full flex flex-col justify-center items-center py-16 sm:py-24 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Événements
        </h2>
        <p className="mt-3 text-lg text-gray-500 sm:mt-4">
          Ne manquez pas nos prochains événements passionnants.
        </p>
      </div>
      <div className="relative w-full max-w-7xl mx-auto">
        <EventFilters
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            Chargement des événements...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            Erreur lors du chargement des événements: {error}
          </div>
        ) : (
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
              {displayedEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3 px-4 md:px-6"
                >
                  <Card className="bg-white rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-green-950 transition-shadow duration-300">
                    <div className="relative h-60 sm:h-72">
                      <img
                        src={event.image || '/default-placeholder.jpg'}
                        alt={event.title}
                        className="rounded-t-lg w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--base-green)]">
                          {event.title}
                        </h3>
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
        )}
      </div>
    </div>
  );
}
