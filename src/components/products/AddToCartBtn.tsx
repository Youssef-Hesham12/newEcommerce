import React from 'react'
import { Button } from '../ui'
import { Loader2, ShoppingCart } from 'lucide-react';

interface addToCartProps{
    productQuantity:number;
    addToCartLoading :boolean;
    handleAddProductToCart:()=>void
}
export default function AddToCartBtn({productQuantity,addToCartLoading,handleAddProductToCart}:addToCartProps) {
  
  return (
        <Button
              size="lg"
              className="flex-1"
              disabled={productQuantity === 0 ||addToCartLoading}
              onClick={handleAddProductToCart}
              
              >
            {addToCartLoading && <Loader2 className="animate-spin"/>}
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
  );
}
