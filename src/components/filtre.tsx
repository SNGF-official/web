import { Dispatch, SetStateAction } from 'react';

type Availability = 'all' | 'available' | 'unavailable';
type SortBy = 'name' | 'price' | 'availability';

interface FiltersProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filterAvailability: Availability;
  setFilterAvailability: Dispatch<SetStateAction<Availability>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
}

const Filters = ({
  search,
  setSearch,
  filterAvailability,
  setFilterAvailability,
  sortBy,
  setSortBy,
}: FiltersProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Rechercher par nom ou description..."
        className="p-2 rounded border border-gray-300"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <select
        className="p-2 rounded border border-gray-300"
        value={filterAvailability}
        onChange={(e) => {
          setFilterAvailability(e.target.value as Availability);
        }}
      >
        <option value="all">Tous</option>
        <option value="available">Disponibles</option>
        <option value="unavailable">Non disponibles</option>
      </select>
      <select
        className="p-2 rounded border border-gray-300"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value as SortBy);
        }}
      >
        <option value="name">Nom</option>
        <option value="price">Prix</option>
        <option value="availability">Quantité</option>
      </select>
    </div>
  );
};

export { Filters };
export type { Availability, SortBy };
