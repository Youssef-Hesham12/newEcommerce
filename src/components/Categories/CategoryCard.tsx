"use client";

import Image from "next/image";
import Link from "next/link";
import { Category} from "@/interfaces";


interface categorysCardProps{
  category :Category;
}

export function CategoriesCard({category}:categorysCardProps) {


  return (
          <div className="group relative bg-white border rounded-lg  overflow-hidden hover:shadow-lg transition-all duration-300 w-[300px] h-[320]">
          {/* Product Image */}
          
          <div className="relative aspect-square overflow-hidden w-full h-[250px]">
            <Image
              src={category!.image??""}
              alt={category!.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />


          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* category */}
            <p className="text-xs text-muted-foreground text-center mb-1 uppercase tracking-wide">
              <Link
                href={`/categories/${category._id}`}
                className="hover:text-primary  hover:underline transition-colors text-2xl"
              >
                {category.name}
              </Link>
            </p>
            
         
          </div>
        </div>

  );
}