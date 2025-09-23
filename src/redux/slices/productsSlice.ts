import { Product } from "@/interfaces";
import { apiServices } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





export const getAllProducts=createAsyncThunk("products/getAllProducts",async ()=>{
    // const response =await apiServices.getAllProducts()
    // return response.data

    const {data} =await apiServices.getAllProducts()
    return data
})

const initialState : {products:Product[]} ={
         products:[] 
        }

const productsSlice= createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,()=>{
            console.log("pending");
        })
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            console.log("fulfidded");
            state.products= action.payload;
            console.log(action.payload);
            
        })
        builder.addCase(getAllProducts.rejected,()=>{
            console.log("rejected");
         
            
            
        })
    }

})

export const productsReducer =productsSlice.reducer 