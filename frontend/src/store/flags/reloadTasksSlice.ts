import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Create the initial slice
const initialState = {
  value: false,
};

//Create the slice
const reloadTaskSlice = createSlice({
  name: "reloadTask",
  initialState,
  reducers: {
    //Set the side bar flag
    reloadTask: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
});

export const { reloadTask } = reloadTaskSlice.actions;

export default reloadTaskSlice.reducer;