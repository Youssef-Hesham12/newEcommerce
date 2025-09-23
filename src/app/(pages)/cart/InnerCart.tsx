"use client";
import React, { useContext, useEffect, useState } from 'react'
import { Separator } from '@radix-ui/react-separator';
import {  Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components';
import { formatPrice } from '@/helpers/currency';
import { GetCartResponse } from '@/interfaces';
import CartProducts from '@/components/products/CartProducts';
import toast from 'react-hot-toast';
import { apiServices } from '@/services/api';
import Link from 'next/link';
import { cartContext } from '@/components/contexts/cartContext';


interface innerCartProps{
   CartData :GetCartResponse;
}
export default function InnerCart({CartData}:innerCartProps) {
  const [innerCartData, setInnerCartData] = useState(CartData)
  const [isClearingCart, setIsClearingCart] = useState(false)
  const [checkOutLoading,setCheckOutLoading]=useState(false)
  const {setCartCount} =useContext(cartContext)


  useEffect(()=>{
    setCartCount!(innerCartData.numOfCartItems)
  },[innerCartData])




 async function handleCheckOut(){
    setCheckOutLoading(true)
    const response = await apiServices.checkOut(CartData.cartId)
    location.href =response.session.url
    setCheckOutLoading(false)


 }

   async function updateCart(){
       const newCartData =await apiServices.getUserCart()
          setInnerCartData(newCartData)
    }

    async function handleRemoveCartItem(productId:string,setRemovingProduct:(value:boolean) =>void){
          setRemovingProduct(true)
          const res =await apiServices.removeCartProduct(productId)
          console.log(res);
          // const newCartData =await apiServices.getUserCart()
          // setInnerCartData(newCartData)
          updateCart()
          toast.success("product deleted successfully",{
              position:"bottom-right"
          })
          setRemovingProduct(false)
  
        }
        async function handleClearCart(){
          setIsClearingCart(true)
          const response =await apiServices.clearCartProduct()
          //  const newCartData =await apiServices.getUserCart()
          // setInnerCartData(newCartData)
         updateCart()
          toast.success("products deleted successfully",{
              position:"bottom-right"
          })
          setIsClearingCart(false)
        }


        async function handleUpdateCartProduct(productId:string,count:number){
          const response = await apiServices.updateCartProduct(productId,count)
          // console.log(response);
          // const newCartData =await apiServices.getUserCart()
             // setInnerCartData(newCartData)
          updateCart()
       
        }

  return (
    <div>
          {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {innerCartData.numOfCartItems > 0 && (
          <p className="text-muted-foreground">
            {innerCartData.numOfCartItems} item
            {innerCartData.numOfCartItems > 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>


    
       {innerCartData.numOfCartItems > 0 ?(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCartData.data.products.map((item) => (
                    <CartProducts handleUpdateCartProduct={handleUpdateCartProduct} handleRemoveCartItem={handleRemoveCartItem} item={item}  key={item._id}/>
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <Button
                variant="outline"
                disabled={isClearingCart}
                onClick={handleClearCart}
              >
                  {isClearingCart? <Loader2 className='animate-spin'/>:<Trash2 className="h-4 w-4 mr-2" />}
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
              </div>

              <Button disabled={checkOutLoading} onClick={handleCheckOut} className="w-full" size="lg">
                {checkOutLoading && <Loader2 className='animate-spin'/>}
                Proceed to Checkout

              </Button>

              <Button variant="outline" className="w-full mt-2">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
       ):(
        <div className='text-center'>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">No products in your cart</h2>
              <Button variant="outline" className="w-fit mt-2" asChild>
                 <Link href='/products'> Add ones</Link>
              </Button>
        </div>
       )}
        
       
    </div>
  )
}
