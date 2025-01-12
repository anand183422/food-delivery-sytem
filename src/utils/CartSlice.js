import { createSlice } from "@reduxjs/toolkit"

const CartSlice =createSlice({
    name:"cart",
    initialState:{
        item :[]
    },
    reducers:{
        addItem :(state,action)=>{
            state.item.push(action.payload)
        },
        removeItem: (state,action)=>{
          state.item.splice(action.payload,1)
        },
        clearItem:(state,action)=>{
          state.item.length =0;
          
        }

    }
}
)
export const {addItem,removeItem,clearItem} = CartSlice.actions;

export default CartSlice.reducer;