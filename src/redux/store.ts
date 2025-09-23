import { configureStore } from "@reduxjs/toolkit";
import { countReducer } from "./slices/counterSlice";
import { productsReducer } from "./slices/productsSlice";





export const store =configureStore({
    reducer:{
        counter:countReducer,
        products:productsReducer
    }
})


export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
