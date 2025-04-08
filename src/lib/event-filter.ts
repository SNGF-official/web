interface Event {
  title: string;
  image: string;
  date: string; // format '15 Avril 2025'
  description: string;
  link: string;
}

type EventSortBy = 'date-asc' | 'date-desc';

export function getFilteredEvents(
  events: Event[],
  search: string,
  sortBy: EventSortBy
): Event[] {
  const filtered = events.filter((event) => {
    const lower = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(lower) ||
      event.description.toLowerCase().includes(lower)
    );
  });

  const parseDate = (dateStr: string): Date => {
    const months: Record<string, number> = {
      janvier: 0,
      février: 1,
      mars: 2,
      avril: 3,
      mai: 4,
      juin: 5,
      juillet: 6,
      août: 7,
      septembre: 8,
      octobre: 9,
      novembre: 10,
      décembre: 11,
    };

    const [day, monthName, year] = dateStr.split(' ');
    const month = months[monthName.toLowerCase()] ?? 0;
    return new Date(parseInt(year), month, parseInt(day));
  };

  return filtered.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return sortBy === 'date-asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
}

export type { Event, EventSortBy };
