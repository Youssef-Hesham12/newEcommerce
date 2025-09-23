import { createSlice } from "@reduxjs/toolkit";





// createSlice({
//     name: "count",
//     initailState:{
//         count:0
//     },
//     reducers:{

//     }
// })



const initialState={
        count:2
    }

const counterSlice=createSlice({
    name: "count",
   initialState,
    reducers:{
        increment:(state)=>{
            state.count++;
        },
        decrement:(state)=>{
            state.count--;
        },
        increase:(state,action)=>{
            state.count+=action.payload
        }
    }
})


export const countReducer= counterSlice.reducer
export const {increment,decrement,increase} = counterSlice.actions