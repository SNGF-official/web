import { useState, useCallback } from 'react';
import {
  Plant,
  PlantsApi,
} from 'generated-client';
import { ProductCard, ProductDetail } from '@/components/product';
import { XIcon } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { NavigationBar } from '@/components/navbar';
import { useRef } from 'react';
import { usePlants } from '@/hooks/usePlant.ts';

const AnimatedPlantCard = ({
                             plant,
                             onClick,
                           }: {
  plant: Plant;
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
      <ProductCard product={plant as never} onClick={() => { onClick(plant.id); }} />
    </motion.div>
  );
};

const PlantPage = () => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | undefined>(undefined);
  const [selectedPlant, setSelectedPlant] = useState<Plant | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(''); // Make search stateful
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { plants, } = usePlants({
    page,
    pageSize,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const plantsApi = new PlantsApi(); // Initialize API client

  const fetchPlantDetails = useCallback(async (id: string) => {
    try {
      const details = await plantsApi.getPlantByID({ id });
      setSelectedPlant(details);
      setShowModal(true);
    } catch (err) {
      console.error("Erreur lors du chargement des détails de la plante:", err);
    }
  }, [plantsApi]);

  const handlePlantClick = useCallback(async (id: string) => {
    await fetchPlantDetails(id).then(r => { console.log("okoko :"+r); });
  }, [fetchPlantDetails]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedPlantId(undefined);
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
    setPage(1); // Reset page on new search for proper filtering
  };

  return (
    <>
      <NavigationBar elements={navList} />
      <div className="relative min-h-screen bg-white flex">
        {/* Sidebar desktop (vous pouvez ajouter des filtres spécifiques aux plantes ici) */}
        <div className="hidden md:flex flex-col w-1/6 p-4">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={search}
            onChange={handleSearchChange}
            className="mb-2 p-2 border rounded"
          />
          {/* Add other filter controls here */}
        </div>

        {/* Partie produits (plantes) */}
        <div className={`w-full md:${selectedPlantId ? 'w-1/3' : 'w-5/6'} overflow-y-auto h-screen p-4 transition-all duration-300`}>
          <div className="md:hidden mb-4">
            <input
              type="text"
              placeholder="Rechercher par nom"
              value={search}
              onChange={handleSearchChange}
              className="mb-2 p-2 border rounded w-full"
            />
            {/* Add other mobile filter controls here */}
          </div>

          <h2>Boutique Plantes</h2>

          {plants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {plants.map((plant) => (
                <AnimatedPlantCard
                  key={plant.id}
                  plant={plant}
                  onClick={handlePlantClick}
                />
              ))}
            </div>
          ) : (
            <div>Aucune plante trouvée.</div>
          )}
          {plants.length === pageSize && (
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
          {selectedPlant && (
            <motion.div
              key="product-detail"
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
                ← Retour aux produits
              </button>
              <ProductDetail
                product={selectedPlant}
                open={!!selectedPlant}
                onClose={resetSelection}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal mobile */}
        {showModal && selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:hidden z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={closeModal}
            >
              <XIcon />
            </button>
            <ProductDetail product={selectedPlant as never} open={!!selectedPlant} onClose={resetSelection} />
          </div>
        )}
      </div>
    </>
  );
};

export { PlantPage };