import { useState, useEffect, useCallback, useRef } from 'react';
import { Plant, Seed, PlantsApi, SeedsApi } from 'generated-client';
import { ProductCard, ProductDetail } from '@/components/product';
import { XIcon } from 'lucide-react';
import { Availability, Filters, SortBy } from '@/components';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { NavigationBar } from '@/components/navbar';

type Product = Plant | Seed;

const AnimatedProductCard = ({
                               product,
                               onClick,
                             }: {
  product: Product;
  onClick: (id: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      <ProductCard product={product} onClick={() => { onClick(product.id); }} />
    </motion.div>
  );
};

const ShopPage = () => {
  const [, setSelectedProductId] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<Availability>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const plantsApi = new PlantsApi();
      const seedsApi = new SeedsApi();

      const plantsResponse = await plantsApi.getListPlant({
        name: search,
        page,
        pageSize,
      });
      const seedsResponse = await seedsApi.getListSeed({
        name: search,
        page,
        pageSize,
      });

      setProducts([...plantsResponse, ...seedsResponse]);
    } catch (err: unknown) {
      setError('Erreur lors du chargement des produits.');
    } finally {
      setLoading(false);
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchProducts().catch(console.error);
  }, [fetchProducts]);

  const fetchProductDetails = useCallback(async (id: string) => {
    try {
      const plantsApi = new PlantsApi();
      const seedsApi = new SeedsApi();

      const isSeed = products.find((p) => p.id === id && 'pricePerKilo' in p);
      const product = isSeed
        ? await seedsApi.getSeedByID({ id })
        : await plantsApi.getPlantByID({ id });

      setSelectedProduct(product);
      setShowModal(true);
    } catch (err) {
      console.error('Erreur lors du chargement des détails du produit:', err);
    }
  }, [products]);

  const handleProductClick = useCallback(
    (id: string) => {
      setSelectedProductId(id);
      fetchProductDetails(id).catch(console.error);
    },
    [fetchProductDetails]
  );

  const closeModal = useCallback(() => {
    setSelectedProductId(undefined);
    setSelectedProduct(undefined);
    setShowModal(false);
  }, []);

  const navList = [
    { name: 'A propos', href: '/home#A propos' },
    { name: 'Articles', href: '/blog' },
    { name: 'Graines', href: '/shop/seeds' },
    { name: 'Plantes', href: '/shop/plants' },
  ];

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return (
    <>
      <NavigationBar elements={navList} />
      <div className="relative min-h-screen bg-white flex">
        {/* Sidebar desktop */}
        <div className="hidden md:flex flex-col w-1/6 p-4">
          <Filters
            search={search}
            setSearch={setSearch}
            filterAvailability={filterAvailability}
            setFilterAvailability={setFilterAvailability}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Partie produits */}
        <div
          className={`w-full md:${selectedProduct ? 'w-1/3' : 'w-5/6'} overflow-y-auto h-screen p-4 transition-all duration-300`}
        >
          <div className="md:hidden mb-4">
            <Filters
              search={search}
              setSearch={setSearch}
              filterAvailability={filterAvailability}
              setFilterAvailability={setFilterAvailability}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <h1 className="items-center text-center text-[var(--base-green)] text-6xl mb-2">Toutes espèces</h1>

          {loading ? (
            <div>Chargement des produits...</div>
          ) : error ? (
            <div>Erreur : {error}</div>
          ) : (
            <div className="grid lg:grid-cols-3 justify-center md:grid-cols-2 gap-4">
              {products.map((product) => (
                <AnimatedProductCard key={product.id} product={product} onClick={handleProductClick} />
              ))}
            </div>
          )}
          {!loading && products.length === pageSize && (
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
          {selectedProduct && (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block fixed top-0 right-0 w-[50vw] h-screen overflow-y-auto p-6 bg-white shadow-lg z-40"
            >
              <button
                className="text-sm text-gray-500 mb-4 flex items-center hover:text-gray-800"
                onClick={closeModal}
              >
                ← Retour aux produits
              </button>
              <ProductDetail product={selectedProduct} open={!!selectedProduct} onClose={closeModal} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal mobile */}
        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:hidden z-50">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={closeModal}
            >
              <XIcon />
            </button>
            <ProductDetail product={selectedProduct} open={!!selectedProduct} onClose={closeModal} />
          </div>
        )}
      </div>
    </>
  );
};

export { ShopPage };
