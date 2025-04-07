import { useState } from 'react';
import { Product, products as initialProducts } from '@/lib/products';
import { ProductCard, ProductDetail } from '@/components/product';
import { XIcon } from 'lucide-react';
import { Availability, Filters, SortBy } from '@/components';
import { getFilteredProducts } from '@/lib/filter-util.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationBar } from '@/components/navbar';

const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterAvailability, setFilterAvailability] =
    useState<Availability>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const resetSelection = () => {
    setSelectedProduct(undefined);
    setShowModal(false);
  };

  const filteredProducts = getFilteredProducts(
    initialProducts,
    search,
    filterAvailability,
    sortBy
  );

  return (
    <div>
      <NavigationBar />
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

      {/* Partie produits + filtres mobile */}
      <div className={`w-full md:${selectedProduct ? 'w-1/3' : 'w-5/6'} overflow-y-auto h-screen p-4 transition-all duration-300`}>
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

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                handleProductClick(product);
              }}
            />
          ))}
        </div>
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
            className="hidden md:block fixed top-0 right-0 w-[50vw] h-screen overflow-y-auto p-6 bg-white shadow-lg"
          >
            <button
              className="text-sm text-gray-500 mb-4 flex items-center hover:text-gray-800"
              onClick={resetSelection}
            >
              ← Retour aux produits
            </button>
              <ProductDetail
                product={selectedProduct}
                open={!!selectedProduct}
                onClose={resetSelection}
              />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal mobile */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:hidden z-50">
          <button
            className="absolute top-2 right-2 text-gray-500 text-xl"
            onClick={closeModal}
          >
            <XIcon />
          </button>
            <ProductDetail product={selectedProduct}
                           open={!!selectedProduct}
                           onClose={resetSelection} />
        </div>
      )}
    </div>
    </div>
  );
};

export { ShopPage };
