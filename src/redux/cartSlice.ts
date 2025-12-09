// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    count: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    count: 0,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        decrementCartCount: (state, action: PayloadAction<number>) => {
            const decrementValue = action.payload ?? 1; // default to 1 if undefined
            state.count = Math.max(0, state.count - decrementValue);
        },
        resetCartCount: (state) => {
            state.count = 0;
            state.error = null;
        },
    },
});

export const { setCartCount, decrementCartCount, resetCartCount } =
    cartSlice.actions;

export default cartSlice.reducer;
