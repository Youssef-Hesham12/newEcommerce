"use client";
import { useEffect, useState } from "react";
import { apiServices } from "@/services/api";
import InnerWishList from "./InnerWishlist";
import { GetWishlistResponse } from "@/interfaces";

export default function WishList() {
 const [wishListData, setWishListData] = useState<GetWishlistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  async function fetchWishList() {
    setLoading(true);

    const response = await apiServices.getUserWishList();
    console.log("WishList API response:", response);

    setWishListData(response);
    setLoading(false);
  }


  useEffect(() => {
    fetchWishList();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
    {wishListData && <InnerWishList WishListData={wishListData} />}
    </div>
  );
}

