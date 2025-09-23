"use client"

import { apiServices } from "@/services/api";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartCount?: number;
    setCartCount?: Dispatch<SetStateAction<number>>;
    isLoading?: boolean;
    handleAddProductToCart?: (
        productId: string,
        setAddToCartLoading: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>;
}

export const cartContext = createContext<CartContextType>({})

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function handleAddProductToCart(
        productId: string,
        setAddToCartLoading: Dispatch<SetStateAction<boolean>>
    ) {
        setAddToCartLoading(true);
        const data = await apiServices.addProductToCart(productId);
        setCartCount(data.numOfCartItems);
        toast.success(data.message);
        setAddToCartLoading(false);
    }

    async function getCart() {
        setIsLoading(true);
        const response = await apiServices.getUserCart();
        setCartCount(response.numOfCartItems);
        setIsLoading(false);
    }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <cartContext.Provider value={{ cartCount, setCartCount, isLoading, handleAddProductToCart }}>
            {children}
        </cartContext.Provider>
    );
}
