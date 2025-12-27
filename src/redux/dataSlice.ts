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

// ✅ FIXED: GET API with proper data extraction
export const getData = createAsyncThunk("data/get", async () => {
  const res = await api.get(`${endPointApi.getAllLiveCourses}`);

  console.log('📊 Raw API Response:', res.data);

  // ✅ CRITICAL FIX: Extract the 'data' array from the response
  const courseData = res.data.data || res.data || [];

  console.log('📊 Extracted Course Data:', courseData);

  // ✅ Verify that modules have _id fields
  if (courseData.length > 0) {
    console.log('📊 First Course Modules:', courseData[0].choose_plan_list);
    courseData[0].choose_plan_list?.forEach((module: any, index: number) => {
      console.log(`Module ${index}:`, {
        _id: module._id,
        title: module.title,
        hasId: !!module._id
      });
    });
  }

  return courseData;
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
        // ✅ Now action.payload contains the courses array directly
        state.list = action.payload;

        console.log('✅ Redux State Updated:', {
          coursesCount: action.payload.length,
          firstCourse: action.payload[0]
        });
      })
      .addCase(getData.rejected, (state, action) => {
        state.loadings = false;
        console.error('❌ Failed to fetch data:', action.error);
      });
  },
});

export default dataSlice.reducer;