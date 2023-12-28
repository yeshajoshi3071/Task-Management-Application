import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Create the initial slice
const initialState = {
  value: false,
};

//Create the slice
const reloadBoardSlice = createSlice({
  name: "reloadBoard",
  initialState,
  reducers: {
    //Set the side bar flag
    reloadBoard: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
});

export const { reloadBoard } = reloadBoardSlice.actions;

export default reloadBoardSlice.reducer;