import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Create the initial slice
const initialState = {
  value: false || window.localStorage.getItem('isLoggedIn') === 'true',
};

//Create the slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //Set the side bar flag
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;