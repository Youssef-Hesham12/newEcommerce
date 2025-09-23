"use client";
import Image from "next/image";
import Link from "next/link";
import {  Category } from "@/interfaces";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SingleCategoryResponse } from "@/types";
import { apiServices } from "@/services/api";
import { useParams } from "next/navigation";

export default function CategoryCard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category| null>(null);
  // const [subCategory, setSubCategory] = useState<SubCategory| null>(null);
  async function fetchSingleCategory() {
    setLoading(true);
    const data: SingleCategoryResponse = await apiServices.getSingleCategory(String(id));
    setCategory(data.data);
    setLoading(false);
  }

  // async function fetchSubCategory() {
  //   setLoading(true);
  //   const data: SingleSubCategoryResponse = await apiServices.getSpecificSubCategory(String(id));
  //   setSubCategory(data.data);
  //   setLoading(false);
  //   console.log("sub:",data.data);
    
  // }
  useEffect(() => {
    fetchSingleCategory();
    // fetchSubCategory();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div className="relative w-full h-[350px] bg-gray-50 rounded-xl overflow-hidden shadow">
          <Image
            src={category!.image??""}
            alt={category!.name}
            fill
            priority
            className="object-contain p-6 transition-transform duration-500 "
            sizes="100vw"
          />
        </div>


        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {category!.name}
          </h1>

          <p className="text-gray-500 text-base">
            <span className="font-semibold">Slug:</span> {category!.slug}
          </p>

          <p className="text-gray-500 text-base">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(category!.createdAt as string).toLocaleDateString()}
          </p>

          <p className="text-gray-500 text-base">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(category!.updatedAt as string).toLocaleDateString()}
          </p>

          <div className="flex gap-4">
            <Link
              href={`/categories`}
              className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-black/90 transition"
            >
              Back To Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
