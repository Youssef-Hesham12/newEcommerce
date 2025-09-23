'use client';
import { formatPrice } from '@/helpers/currency'
import { Link, Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui'
import { CartResponseProduct, InnerCartProduct, Product} from '@/interfaces'
import { apiServices } from '@/services/api';
import toast from 'react-hot-toast';
import AddToCartBtn from './AddToCartBtn';
import { cartContext } from '../contexts/cartContext';

interface WishListProductProps{
    product:Product,
    handleRemoveWishListItem : (productId:string ,setRemovingProduct:(value:boolean)=>void )=> void,
    // setWihListLoading:(value:boolean)=>void,
    // handleAddProductToCart: (productId:string ,setAddToCartLoading:(value:boolean)=>void )=> void,
}
export default function WishListProducts({product,handleRemoveWishListItem}:WishListProductProps) {
    const [removingProduct, setRemovingProduct] = useState<boolean>(false)
    //  const {handleAddProductToCart} =useContext(cartContext)
     const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false)
         const {handleAddProductToCart} =useContext(cartContext)


  return (
    <>
  <div
                key={product._id}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-[120px] h-[120px]">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-green-600 font-bold">
                      {product.price} EGP
                    </p>
                    <button
                      onClick={() => handleRemoveWishListItem(product._id,setRemovingProduct)}
                      className="flex items-center gap-1 text-red-500 mt-2 hover:underline"
                    >
                      {removingProduct ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}{" "}
                      Remove
                    </button>
                  </div>
                </div>

                <div className="pt-10">
                  <AddToCartBtn
                    productQuantity={product.quantity}
                    addToCartLoading={addToCartLoading}
                    handleAddProductToCart={async () =>
                         { await handleAddProductToCart!(product._id,setAddToCartLoading)
                            ;handleRemoveWishListItem(product._id, setRemovingProduct); 
                        }}
                    
                  />
                </div>
              </div>
    </>
  )
}
