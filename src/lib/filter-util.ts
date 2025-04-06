import { Product } from './products';
import type { Availability, SortBy } from '@/components/filtre';

export function getFilteredProducts(
  products: Product[],
  search: string,
  availability: Availability,
  sortBy: SortBy
): Product[] {
  return products
    .filter((product) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower);

      const matchesAvailability =
        availability === 'all' ||
        (availability === 'available' && product.availability > 0) ||
        (availability === 'unavailable' && product.availability === 0);

      return matchesSearch && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'availability') return b.availability - a.availability;
      return 0;
    });
}
