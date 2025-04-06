import React from 'react';
import { Product } from '@/lib/products.ts';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white h-auto max-w-[40vw] rounded-xl shadow-md p-4 hover:scale-105 transition overflow-x-hidden"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-bold text-emerald-800">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
    </div>
  );
};

export { ProductCard };
