import { useEffect, useState } from 'react';
import { PlantsApi, PlantCategoryEnum } from 'generated-client'; // Importez PlantCategoryEnum
import { Plant } from 'generated-client';

const plantsApi = new PlantsApi();

interface UsePlantsParams {
  keyword?: string;
  category?: PlantCategoryEnum; // Utilisez le type enum de votre client API
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  status?: 'ACTIVE' | 'INACTIVE';
  page?: number;
  pageSize?: number;
  sort_by?: 'asc' | 'desc';
}

interface UsePlantsResult {
  plants: Plant[];
  loading: boolean;
  error: string;
}

export const usePlants = ({
                            keyword,
                            category,
                            size,
                            status,
                            page,
                            pageSize,
                            sort_by,
                          }: UsePlantsParams): UsePlantsResult => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await plantsApi.getListPlant({
          name: keyword,
          category: category,
          size: size,
          status: status,
          page: page,
          pageSize: pageSize,
        });

        const sortedPlants =
          sort_by === 'asc'
            ? [...data].sort((a, b) => a.name.localeCompare(b.name))
            : sort_by === 'desc'
              ? [...data].sort((a, b) => b.name.localeCompare(a.name))
              : data;

        setPlants(sortedPlants);
      } catch (err) {
        setError(`Erreur lors du chargement des plantes : ${String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants().then(r => { console.log(r); }).catch((e: unknown) => { console.log(e); });
  }, [keyword, category, size, status, page, pageSize, sort_by]);

  return { plants, loading, error };
};