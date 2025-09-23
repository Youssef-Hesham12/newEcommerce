'use client';
import { formatPrice } from '@/helpers/currency'
import { Link, Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui'
import { CartResponseProduct, InnerCartProduct} from '@/interfaces'

interface CartProductProps{
    item:CartResponseProduct<InnerCartProduct>,
    handleRemoveCartItem : (productId:string   ,setRemovingProduct:(value:boolean)=>void )=> void,
    handleUpdateCartProduct:( productId:string,count:number) =>Promise<void>

}
export default function CartProducts({item,handleRemoveCartItem,handleUpdateCartProduct}:CartProductProps) {
    const [removingProduct, setRemovingProduct] = useState<boolean>(false)

    const [productCount, setProductCount] = useState(item.count)
    const [timeOutId, setTimeOutId] = useState< NodeJS.Timeout>()



    async function handleUpdateCount(count:number){
        // setIsIncrementing(true)
         setProductCount(count)
         clearTimeout(timeOutId)
         const id = setTimeout(()=>{
             handleUpdateCartProduct(item.product._id,count)
         },500)
         setTimeOutId(id)
       
        // setIsIncrementing(false)
    }
    // async function handleDecrement(count:number){
    //     // setIsDecrementing(true)
    //     setProductCount(count)
    //     await handleUpdateCartProduct(item.product._id,count)
    //     // setIsDecrementing(false)
    // }
    // async function handleRemoveCartItem(){
    //     setRemovingProduct(true)
    //     const res =await apiServices.removeCartProduct(item.product._id)
    //     console.log(res);
    //     toast.success("product deleted successfully",{
    //         position:"bottom-right"
    //     })
    //     setRemovingProduct(false)

        
    // }
  return (
    <>
               <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-cover rounded-md"
                sizes="80px"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-2">
                <Link
                    href={`/products/${item.product.id}`}
                    className="hover:text-primary transition-colors"
                >
                    {item.product.title}
                </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                {item.product.brand?.name}
                </p>
                <p className="font-semibold text-primary mt-2">
                {formatPrice(item.price)}
                </p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Button
                    onClick={()=>handleRemoveCartItem(item.product._id,setRemovingProduct)}
                    
                    variant="ghost"size="sm">
                {removingProduct ? <Loader2 className='animate-spin'/> :<Trash2 className="h-4 w-4" />}
                </Button>

                <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"
                disabled={item.count==1}
                 onClick={()=>handleUpdateCount(productCount-1)}>
                   <Minus className="h-4 w-4" />
                    {/* {isDecrementing? <Loader2 className='animate-spin'/> :<Minus className="h-4 w-4" />} */}
                </Button>

                <span className="w-8 text-center">{productCount}</span>
                <Button
                disabled={item.count==item.product.quantity}
                onClick={()=>handleUpdateCount(productCount+1)}
                    variant="outline"
                    size="sm"
                    
                >
                    
                    <Plus className="h-4 w-4" />
                   {/* {isIncrementing? <Loader2 className='animate-spin'/>: <Plus className="h-4 w-4" />} */}
                </Button>
                </div>
            </div>
            </div>
    </>
  )
}
