import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ShopCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const ShopCategoryModal: React.FC<ShopCategoryModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = async (path: string) => {
    await navigate(path);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choisissez votre boutique</DialogTitle>
          <DialogDescription>
            Sélectionnez la catégorie de produits que vous souhaitez explorer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleNavigate('/shop/seeds')} className="cursor-pointer bg-[var(--base-green)] hover:bg-green-700 text-white">
            Boutique Graines
          </Button>
          <Button onClick={() => handleNavigate('/shop/plants')} className="cursor-pointer bg-[var(--base-green)] hover:bg-green-700 text-white">
            Boutique Plantes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ShopCategoryModal };