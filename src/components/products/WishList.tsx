
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface WishListProps{
  productId:string
   onAddToWishlist:(id:string) => void
   onRemoveFromWishlist:(id:string) => void
   wishListItems: string[]
}
export default function WishList({productId, onAddToWishlist,onRemoveFromWishlist,wishListItems}:WishListProps) {
    const [liked, setLiked] = useState(false);

    function handleClick(){
      setLiked(!liked)
       if (liked) {
      onRemoveFromWishlist(productId);
       }else{
        onAddToWishlist(productId)
      }
        
      }
    
  useEffect(() => {
    setLiked(wishListItems.includes(productId));
  }, [wishListItems, productId]);
  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <Heart
        className={`w-7 h-7 transition-colors ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
}
