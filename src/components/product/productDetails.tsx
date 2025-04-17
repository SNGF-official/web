import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaQuestionCircle } from 'react-icons/fa';
import { Plant, Seed } from 'generated-client';
import { Button } from '@/components/ui/button.tsx';

interface ProductDetailProps {
  product?: Plant | Seed;
  open: boolean;
  onClose: () => void;
}

const isSeed = (product: Plant | Seed): product is Seed => {
  return 'pricePerKilo' in product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    if (!product || isSeed(product)) {
      setSelectedPrice(undefined);
      return;
    }

    if (product.prices && product.prices.length > 0) {
      setSelectedPrice(product.prices[0]);
    } else {
      setSelectedPrice(undefined);
    }
  }, [product]);

  const nextSlide = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevSlide = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  const handleDotClick = (index: number) => { setCurrentImageIndex(index); };

  const handleSizeSelect = (price: object | undefined) => { setSelectedPrice(price); };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
  };

  const currentImageUrl = product?.images?.[currentImageIndex]?.image ?? null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4 }}
      className="fixed right-0 w-full md:w-[50vw] h-screen bg-white shadow-lg z-100 p-6 overflow-y-auto"
    >
      <button onClick={onClose} className="mb-4 text-sm text-gray-600 hover:text-gray-800">
        ← Retour aux produits
      </button>

      {/* Slideshow */}
      <div className="relative h-[40vh] w-full mb-2 rounded-lg overflow-hidden">
        {currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt={product?.name}
            className="h-full w-full object-contain rounded-xl transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow">‹</button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow">›</button>

        {product?.images?.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => { handleDotClick(index); }}
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-emerald-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Taille et Prix */}
      <div className="flex flex-col gap-2 mb-4">
        {isSeed(product) ? (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-700">
              {product.pricePerKilo} Ar/kg
            </span>
            <div
              className="relative"
              onMouseEnter={() => {
                setIsTooltipVisible(true);
              }}
              onMouseLeave={() => {
                setIsTooltipVisible(false);
              }}
            >
              <FaQuestionCircle className="text-gray-400 cursor-pointer" />
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-md transition-opacity duration-300 ${
                  isTooltipVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                Prix destiné aux commerçants locaux malgaches
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {product?.prices.length ? (
                product.prices.map((price) => (
                  <Button
                    key={price.size}
                    onClick={() => {
                      handleSizeSelect(price);
                    }}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-emerald-200 transition duration-200 ${
                      selectedPrice?.size === price.size ? 'bg-emerald-400 text-[var(--base-green)]' : ''
                    }`}
                  >
                    {price.size}
                  </Button>
                ))
              ) : (
                <span className="text-gray-500">Prix non disponible</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">
                {selectedPrice ? `${selectedPrice.price} Ar` : '---'}
              </span>
              <div
                className="relative"
                onMouseEnter={() => { setIsTooltipVisible(true); }}
                onMouseLeave={() => { setIsTooltipVisible(false); }}
              >
                <FaQuestionCircle className="text-gray-400 cursor-pointer" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-md transition-opacity duration-300 ${
                  isTooltipVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                  Prix destiné aux commerçants locaux malgaches
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Infos produit */}
      <h2 className="text-2xl font-bold text-emerald-900 mb-2">{product?.name}</h2>
      <p className="text-gray-700 mb-2">{product?.description}</p>

      {/* Quantité Disponible */}
      {product?.quantity !== undefined && (
        <p className="text-sm text-gray-600 mb-2">
          Quantité disponible : <span className="font-semibold">{product.quantity}</span>
        </p>
      )}

      {/* Quantité */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => { setQuantity((q) => Math.max(1, q - 1)); }} className="px-3 py-1 bg-emerald-200 rounded">-</button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded"
        />
        <button onClick={() => { setQuantity((q) => q + 1); }} className="px-3 py-1 bg-emerald-200 rounded">+</button>
      </div>

      <p className="text-xs text-gray-500 mb-4">(Vous pourrez commander une quantité supérieure à celle indiquée.)</p>

      {/* Commander Button */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
          disabled={!selectedPrice}
        >
          <FaShoppingCart />
          Commander
        </button>
      </div>
    </motion.div>
  );
};

export { ProductDetail };
