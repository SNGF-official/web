import { useState, useCallback } from 'react';
import { Seed, SeedsApi } from 'generated-client';
import { ProductCard, ProductDetail } from '@/components/product';
import { XIcon } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { NavigationBar } from '@/components/navbar';
import { useRef } from 'react';
import { useSeeds } from '@/hooks/useSeed';

const AnimatedPlantCard = ({
                             seed,
                             onClick,
                           }: {
  seed: Seed;
  onClick: (id: string) => void;
}) => {
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
      }}
    >
      <ProductCard product={seed as never} onClick={() => { onClick(seed.id); }} />
    </motion.div>
  );
};

const SeedPage = () => {
  const [selectedSeedId, setSelectedSeedId] = useState<string | undefined>(undefined);
  const [selectedSeed, setSelectedSeed] = useState<Seed | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { seeds, loading, error } = useSeeds({
    keyword: search,
    page: page,
    pageSize: pageSize,
  });

  const fetchSeedDetails = useCallback(async (id: string) => {
    try {
      const seedsApi = new SeedsApi();
      const details = await seedsApi.getSeedByID({ id: id });
      setSelectedSeed(details);
      setShowModal(true);
    } catch (err) {
      console.error("Erreur lors du chargement des détails de la graine:", err);
    }
  }, []);

  const handleSeedClick = useCallback((id: string) => {
    fetchSeedDetails(id)
      .then(r => { console.log(r); })
      .catch((reason: unknown) => { console.log(reason); });
  }, [fetchSeedDetails]);

  const resetSelection = useCallback(() => {
    setSelectedSeedId(undefined);
    setSelectedSeed(undefined);
    setShowModal(false);
  }, []);

  const navList = [
    { name: 'A propos', href: '/home#A propos' },
    { name: 'Articles', href: '/blog' },
    { name: 'Graines', href: '/shop/seeds' },
    { name: 'Plantes', href: '/shop/plants' },
  ];

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <>
      <NavigationBar elements={navList} />
      <div className="relative min-h-screen bg-white flex">
        {/* Sidebar desktop (vous pouvez ajouter des filtres spécifiques aux graines ici) */}
        <div className="hidden md:flex flex-col w-1/6 p-4">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={search}
            onChange={handleSearchChange}
            className="mb-2 p-2 border rounded"
          />
        </div>

        {/* Partie produits (graines) */}
        <div
          className={`w-full md:${selectedSeedId ? 'w-1/3' : 'w-5/6'} overflow-y-auto h-screen p-4 transition-all duration-300`}>
          <div className="md:hidden mb-4">
            <input
              type="text"
              placeholder="Rechercher par nom"
              value={search}
              onChange={handleSearchChange}
              className="mb-2 p-2 border rounded w-full"
            />
          </div>

          <h1 className="items-center text-center text-[var(--base-green)] text-6xl mb-2">Boutique Graînes</h1>

          {loading ? (
            <div>Chargement des graines...</div>
          ) : error ? (
            <div>Erreur : {error}</div>
          ) : (
            <div className="grid lg:grid-cols-3 justify-center md:grid-cols-2 gap-4">
              {seeds.map((seed) => (
                <AnimatedPlantCard
                  key={seed.id}
                  seed={seed}
                  onClick={handleSeedClick}
                />
              ))}
            </div>
          )}
          {!loading && seeds.length === pageSize && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
              >
                Charger plus
              </button>
            </div>
          )}
        </div>

        {/* ProductDetail Desktop avec animation */}
        <AnimatePresence>
          {selectedSeed && (
            <motion.div
              key="seed-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block fixed top-0 right-0 w-[50vw] h-screen overflow-y-auto p-6 bg-white shadow-lg"
            >
              <button
                className="text-sm text-gray-500 mb-4 flex items-center hover:text-gray-800"
                onClick={resetSelection}
              >
                ← Retour aux graines
              </button>
              <ProductDetail product={selectedSeed as never} open={!!selectedSeed} onClose={resetSelection} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal mobile */}
        {showModal && selectedSeed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:hidden z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={()=> {setShowModal(false)}}
            >
              <XIcon />
            </button>
            <ProductDetail product={selectedSeed as never} open={!!selectedSeed} onClose={resetSelection} />
          </div>
        )}
      </div>
    </>
  );
};

export { SeedPage };