"use client";
import { useEffect, useState } from "react";
import { apiServices } from "@/services/api";
import InnerCart from "./InnerCart";
import { GetCartResponse } from "@/interfaces";

export default function Cart() {
  const [cartData, setCartData] = useState<GetCartResponse|null>(null)
  const [loading, setLoading] = useState(true);

async function fetchCart() {
  setLoading(true);

  const response = await apiServices.getUserCart();
  console.log("Cart API response:", response);

  setCartData(response);
  setLoading(false);
}


  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {cartData && <InnerCart CartData={cartData} />}
    </div>
  );
}
