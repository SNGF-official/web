import { useState, useEffect } from 'react';
import { SeedsApi, Seed, GetListSeedCategoryEnum } from 'generated-client';

interface UseSeedsParams {
  category?: GetListSeedCategoryEnum;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export function useSeeds({
                            category,
                            keyword,
                            page = 1,
                            pageSize = 12,
                          }: UseSeedsParams) {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeeds = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = new SeedsApi();
        const response = await api.getListSeed({
          category,
          name: keyword,
          page,
          pageSize,
        });
        setSeeds(response);
      } catch (err) {
        setError(`Erreur lors du chargement des graines. ${err}`);
      } finally {
        setLoading(false);
      }
    };

     fetchSeeds().then(r => {
      console.log(r);
    }).catch((reason: unknown) => { console.log(reason); });
  }, [category, keyword, page, pageSize]);

  return { seeds, loading, error };
}