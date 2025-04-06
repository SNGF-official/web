import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { Product } from '@/lib/products.ts';

interface ProductDetailProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, open, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextSlide = () => { setCurrent((prev) => (prev + 1) % product.images.length); };
  const prevSlide = () => { setCurrent((prev) => (prev === 0 ? product.images.length - 1 : prev - 1)); };
  const handleDotClick = (index: number) => { setCurrent(index); };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 right-0 w-full md:w-[50vw] h-screen bg-white shadow-lg z-50 p-6 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="mb-4 text-sm text-gray-600 hover:text-gray-800"
      >
        ← Retour aux produits
      </button>

      {/* Slideshow */}
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <img
          src={product.images[current]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
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

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => { handleDotClick(index); }}
              className={`w-3 h-3 rounded-full ${
                index === current ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Infos produit */}
      <h2 className="text-2xl font-bold text-emerald-900 mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>

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
        <span className="text-gray-600">/ {product.availability} dispo</span>
      </div>

      {/* Prix + Commander */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-emerald-700">
          {product.price} Ar
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
