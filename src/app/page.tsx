"use client"
import { Button } from "@/components/ui/button";
import { decrement, increment,increase } from "@/redux/slices/counterSlice";
import { getAllProducts } from "@/redux/slices/productsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {


  // useEffect(()=>{
  //   async function getUsers() {
  //     const response =await fetch("http://localhost:3000/api/users").then(res=>res.json())
  //     console.log(response);
      
  //   }
  //   getUsers()
  // },[])
  // const{count} = useSelector((state:RootState)=>state.counter)
  // const {products} = useSelector((state:RootState)=>state.products)
  // console.log(products);
  
  // const dispatch=useDispatch<AppDispatch>()



  // useEffect(()=>{
  //   dispatch(getAllProducts())
  // },[])



  return (
    <div className="container mx-auto px-4 py-40">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
          Welcome to TechMart 
        </h1>
        {/* <div className="flex justify-center gap-4">
          <Button onClick={()=>dispatch(increment())}>+</Button>
          <Button onClick={()=>dispatch(increase(5))}>+++</Button>
          <Button onClick={()=>dispatch(decrement())}>-</Button>
        </div> */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            <Link href={"/products"}>Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            <Link href={"/categories"}>Browse Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
