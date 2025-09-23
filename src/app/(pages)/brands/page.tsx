"use client";

import { useState, useEffect } from "react";
import { Brand } from "@/interfaces";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { BrandsResponse } from "@/types";
import { apiServices } from "@/services/api";
import { BrandsCard } from "@/components/Brands/BrandsCard";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  async function fetchBrands(){
    setLoading(true)
    const data:BrandsResponse =await apiServices.getAllBrands()
    console.log(data.data);
    setBrands(data.data)
    setLoading(false)
  }


  useEffect(()=>{
      fetchBrands()
  },[])
  if (loading && brands.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4"> Brands</h1>
        <p className="text-muted-foreground">
          Discover amazing brands from our collection
        </p>
      </div>

      {/* Products Grid */}
      <div
        className={"grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}
      >
        {brands.map((brand) => (
          <BrandsCard key={brand._id}  brand={brand}/>
        ))}
      </div>
    </div>
  );
}
