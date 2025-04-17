import React from 'react';
import { Plant, Seed } from 'generated-client';

interface ProductCardProps {
  product: Plant | Seed;
  onClick: (id: string) => void;
}

const isSeed = (product: Plant | Seed): product is Seed => {
  return 'pricePerKilo' in product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const firstImage = product.images?.[0]?.image ?? null;
  const productName = product.name ?? 'Nom inconnu';
  const productDescription = product.description ?? 'Pas de description';
  const productId = product.id ?? '';

  const priceText = isSeed(product)
    ? product.pricePerKilo !== undefined && product.pricePerKilo !== null
      ? `${product.pricePerKilo} Ariary/kg`
      : 'Prix non disponible'
    : product.prices.length > 0 && product.prices[0]?.price !== undefined && product.prices[0]?.price !== null
      ? `À partir de ${product.prices[0].price} Ariary`
      : 'Prix non disponible';

  const handleOnClick = () => {
    if (productId) {
      onClick(productId);
    } else {
      console.error("L'ID du produit est manquant et l'action onClick ne peut pas être déclenchée.");
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className="cursor-pointer bg-white h-auto max-w-[40vw] rounded-xl shadow-md p-4 hover:scale-105 transition overflow-x-hidden"
    >
      {firstImage ? (
        <img
          src={firstImage}
          alt={productName}
          className="w-full h-32 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-gray-400">
          Pas d'image
        </div>
      )}
      <h3 className="text-lg font-bold text-emerald-800">{productName}</h3>
      <p className="text-sm text-gray-600">{productDescription}</p>
      <p className="text-sm text-emerald-700 font-semibold mt-1">{priceText}</p>
    </div>
  );
};

export { ProductCard };