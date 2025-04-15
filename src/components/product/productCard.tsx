import React from 'react';
import { Plant } from 'generated-client';

interface ProductCardProps {
  product: Plant;
  onClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const firstImage = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0].image_urls : null;

  return (
    <div
      onClick={() => { onClick(product.id); }} // Passez l'ID au onClick
      className="cursor-pointer bg-white h-auto max-w-[40vw] rounded-xl shadow-md p-4 hover:scale-105 transition overflow-x-hidden"
    >
      {firstImage ? (
        <img
          src={firstImage}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-gray-400">
          Pas d'image
        </div>
      )}
      <h3 className="text-lg font-bold text-emerald-800">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
    </div>
  );
};

export { ProductCard };