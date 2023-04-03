import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const indx = state.items.findIndex(item => item.id === action.payload.id);
            if(indx === -1){
                state.items.push(action.payload);
                state.items[state.items.length-1].cnt = 1;
            } 
            else state.items[indx].cnt++;            
        },
        removeItem: (state, action) => {
            const indx = state.items.findIndex(item => item.id===action.payload.id);
            state.items[indx].cnt--;
            if(state.items[indx].cnt===0) {
                state.items.splice(indx,1);
            }
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


