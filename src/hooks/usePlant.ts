import { useState, useEffect } from 'react';
import { PlantsApi, Plant, GetListPlantCategoryEnum, GetListPlantSizeEnum } from 'generated-client';

interface UsePlantsParams {
  category?: GetListPlantCategoryEnum;
  size?: GetListPlantSizeEnum;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export function usePlants({
                            category,
                            size,
                            keyword,
                            page = 1,
                            pageSize = 12,
                          }: UsePlantsParams) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = new PlantsApi();
        const response = await api.getListPlant({
          category,
          size,
          name: keyword,
          page,
          pageSize,
        });
        setPlants(response);
      } catch (err) {
        console.error('Erreur lors du chargement des plantes :', err);
        setError('Erreur lors du chargement des plantes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants().then(r => { console.log(r); });
  }, [category, size, keyword, page, pageSize]);

  return { plants, loading, error };
}