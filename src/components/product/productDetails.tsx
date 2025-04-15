// @/components/product/productDetails.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { Plant } from '../../../generated-client';

interface ProductDetailProps {
  product?: Plant;
  open: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, open, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Reset current image index when a new product is opened
    setCurrentImageIndex(0);
  }, [product]);

  const nextSlide = () => {
    if (product?.image_urls && product.image_urls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.image_urls.length);
    }
  };

  const prevSlide = () => {
    if (product?.image_urls && product.image_urls.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.image_urls.length - 1 : prev - 1));
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImageUrl = product?.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls[0].image_urls
    : null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4 }}
      className="fixed right-0 w-full md:w-[50vw] h-screen bg-white shadow-lg z-100 p-6 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="mb-4 text-sm text-gray-600 hover:text-gray-800"
      >
        ← Retour aux produits
      </button>

      {/* Slideshow */}
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        {currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt={product?.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow"
        >
          ›
        </button>

        {product?.image_urls && product.image_urls.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {product.image_urls.map((_, index) => (
              <button
                key={index}
                onClick={() => { handleDotClick(index); }}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Infos produit */}
      <h2 className="text-2xl font-bold text-emerald-900 mb-2">{product?.name}</h2>
      <p className="text-gray-700 mb-4">{product?.description}</p>

      {/* Quantité */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => { setQuantity((q) => Math.max(1, q - 1)); }}
          className="px-3 py-1 bg-emerald-200 rounded"
        >
          -
        </button>
        <span className="font-medium">{quantity}</span>
        <button
          onClick={() => { setQuantity((q) => q + 1); }}
          className="px-3 py-1 bg-emerald-200 rounded"
        >
          +
        </button>
        {/* {product?.availability && (
          <span className="text-gray-600">/ {product.availability} dispo</span>
        )} */}
      </div>

      {/* Prix + Commander */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-emerald-700">
          {product?.price} Ar
        </span>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
          <FaShoppingCart />
          Commander
        </button>
      </div>
    </motion.div>
  );
};

export { ProductDetail };