"use client";

import { useState, useEffect } from "react";
import { Category} from "@/interfaces";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { apiServices } from "@/services/api";
import { CategoriesResponse } from "@/types";
import { CategoriesCard } from "@/components/Categories/CategoryCard";


export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  async function fetchCategories(){
    setLoading(true)
    const data:CategoriesResponse =await apiServices.getAllCategories()
    console.log(data.data);
    setCategories(data.data)
    setLoading(false)
  }


  useEffect(()=>{
      fetchCategories()
  },[])
  if (loading && categories.length === 0) {
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
        <h1 className="text-3xl font-bold mb-4"> categories</h1>
        <p className="text-muted-foreground">
          Discover amazing categories from our collection
        </p>
      </div>

      {/* Products Grid */}
      <div
        className={"grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5"}
      >
        {categories.map((category) => (
          <CategoriesCard key={category._id}  category={category}/>
        ))}
      </div>
    </div>
  );
}
