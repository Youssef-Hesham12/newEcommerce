"use client";
import React, { useState } from 'react'

import {  Loader2 } from 'lucide-react';
import { Button } from '@/components';

import { GetWishlistResponse, WishlistProduct } from '@/interfaces';

import { apiServices } from '@/services/api';
import Link from 'next/link';
import WishListProducts from '@/components/products/WishListProduct';




interface WishListProps{
   WishListData :GetWishlistResponse;
}
export default function InnerWishList({WishListData}:WishListProps) {
// const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false)
const [innerWishListData, setInnerWishListData] = useState<GetWishlistResponse>(WishListData);
const [wihListLoading,setWhListLoading]=useState(false)



//     const {setCartCount} =useContext(cartContext)


//   useEffect(()=>{
//     setCartCount(innerWishListData.numOfCartItems)
//   },[innerWishListData])



// async function handleAddProductToCart(productId:string,setRemovingProduct:(value:boolean) =>void){
//     setAddToCartLoading(true)
//     setRemovingProduct(true)
//     const data = await apiServices.addProductToCart(productId)
//     handleRemoveWishListItem(productId,setRemovingProduct)
//         setRemovingProduct(false)
//     setAddToCartLoading(false)
//     toast.success("product is added to cart successfully")


//     // console.log(data.message);
    

//   }




//  async function handleWishlist(){
//     setWhListLoading(true)
//     const response = await apiServices.addProductTowishlist(WishListData._id)
//     location.href =response.session.url
//     setWhListLoading(false)


//  }

//    async function handleWishlist() {
//       setLoading(true);
//       const res = await apiServices.getUserWishList();
//       setWishlist(res.data); 
//       setLoading(false);
//     }

   async function updateWishList(){
       const newWishListData =await apiServices.getUserWishList()
         setInnerWishListData(newWishListData)
    }

    async function handleRemoveWishListItem(productId:string,setRemovingProduct:(value:boolean) =>void){
        setRemovingProduct(true)
        const res =await apiServices.removeWishListProduct(productId)
        console.log(res);
          // const newCartData =await apiServices.getUserCart()
          // setInnerCartData(newCartData)
        updateWishList()
        //   toast.success("product deleted from wishlist successfully",{
        //       position:"bottom-right"
        //   })
        setRemovingProduct(false)
        }
        // async function handleClearCart(){
        //   setIsClearingCart(true)
        //   const response =await apiServices.clearCartProduct()
        //   //  const newCartData =await apiServices.getUserCart()
        //   // setInnerCartData(newCartData)
        //  updateCart()
        //   toast.success("products deleted successfully",{
        //       position:"bottom-right"
        //   })
        //   setIsClearingCart(false)
        // }


        // async function handleUpdateCartProduct(productId:string,count:number){
        //   const response = await apiServices.updateCartProduct(productId,count)
        //   // console.log(response);
        //   // const newCartData =await apiServices.getUserCart()
        //      // setInnerCartData(newCartData)
        //   updateCart()
       
        // }

  if (wihListLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        {/* <h1 className="text-3xl font-bold mb-8">My Wish List</h1> */}

        {innerWishListData.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500 text-lg">
              🚫No products in your Wishlist
            </div>
            <Button variant="outline" className="w-fit mt-2" asChild>
              <Link href="/products"> Add ones</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {innerWishListData.data.map((product:WishlistProduct) => (
            <WishListProducts handleRemoveWishListItem={handleRemoveWishListItem} product={product}  key={product._id}/>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          {innerWishListData.count> 0 && (
            <p className="text-muted-foreground">
              {innerWishListData.count} item
              {innerWishListData.count > 1 ? "s" : ""} in your cart
            </p>
          )} */}
        {/* </div> */}
      </div>
    </>
  );
}
