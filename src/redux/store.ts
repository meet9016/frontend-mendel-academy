import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
    currency: currencyReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
