"use client";

import Image from "next/image";
import Link from "next/link";
import { Brand} from "@/interfaces";
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,

  DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"

// interface ProductCardProps {
//   product: Product;
//   viewMode?: "grid" | "list";
// }

interface BrandsCardProps{
  brand :Brand;
}

export function BrandsCard({ brand}:   BrandsCardProps) {

  return (
   
    <Dialog >
      <form>
        <DialogTrigger asChild>
          
          {/* <Button variant="outline">Open Dialog</Button> */}
          <div className="group relative bg-white border rounded-lg  overflow-hidden hover:shadow-lg transition-all duration-300 w-[250px] ">
          {/* Product Image */}
          
          <div className="relative aspect-square overflow-hidden w-full h-[190px]">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-xs text-muted-foreground text-center mb-1 uppercase tracking-wide">
              <Link
                href={`/brands/${brand._id}`}
                className="hover:text-primary  hover:underline transition-colors"
              >
                {brand.name}
              </Link>
            </p>


          </div>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
         
          <Separator className='bg-gray-300 my-5'/>
        
           <div className="flex justify-between">
              <div className="grid gap-3">
              <h1 className="text-green-500 text-5xl font-bold">{brand.slug}</h1>
              <h3>{brand.name}</h3>
            </div>
            <div className="grid gap-4 relative w-50 flex-shrink-0">
            <Image
                src={brand!.image}
                alt={brand!.name}
                fill
                className="object-cover"
                sizes=""
                      />
            </div>
          
      
          </div> 
          {/* } */}

           <Separator className='bg-gray-300 mt-5'/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-600 text-white">Cancel</Button>
            </DialogClose>
           
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
 
  );
}