import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataState {
  loadings: boolean;
  list: any[];
}

const initialState: DataState = {
  loadings: false,
  list: [],
};

// GET API
export const getData = createAsyncThunk("data/get", async () => {
  const res = await api.get(`${endPointApi.getAllLiveCourses}`);
  return await res.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loadings = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loadings = false;
        state.list = action.payload;
      });
  },
});

export default dataSlice.reducer;
