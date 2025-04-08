import { Dispatch, SetStateAction } from 'react';
import type { EventSortBy } from '@/lib/';

interface EventFiltersProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sortBy: EventSortBy;
  setSortBy: Dispatch<SetStateAction<EventSortBy>>;
}

export const EventFilters = ({
                               search,
                               setSearch,
                               sortBy,
                               setSortBy,
                             }: EventFiltersProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-8 px-4">
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); }}
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <select
        value={sortBy}
        onChange={(e) => { setSortBy(e.target.value as EventSortBy); }}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="date-asc">Date croissante</option>
        <option value="date-desc">Date décroissante</option>
      </select>
    </div>
  );
};
