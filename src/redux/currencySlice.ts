import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  userCountry: string | null;
  userCurrency: string | null;
}

const initialState: CurrencyState = {
  userCountry: null,
  userCurrency: null, // "INR" or "USD"
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyContext: (
      state,
      action: PayloadAction<{ userCountry: string; userCurrency: string }>
    ) => {
      state.userCountry = action.payload.userCountry;
      state.userCurrency = action.payload.userCurrency;
    },
  },
});

export const { setCurrencyContext } = currencySlice.actions;
export default currencySlice.reducer;
