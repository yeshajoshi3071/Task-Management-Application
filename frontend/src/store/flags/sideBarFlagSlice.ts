import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Create the initial slice
const initialState = {
  value: false,
};

//Create the slice
const sideBarFlagSlice = createSlice({
  name: "isSidebarOpen",
  initialState,
  reducers: {
    //Set the side bar flag
    setSideBarFlag: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
});

export const { setSideBarFlag } = sideBarFlagSlice.actions;

export default sideBarFlagSlice.reducer;