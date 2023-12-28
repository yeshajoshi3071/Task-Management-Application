import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotificationType {
  value: string;
}
//Create the initial slice
const initialState: NotificationType = {
  value: '',
};

//Create the slice
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    //Set the side bar flag
    setNotificationMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
});

export const { setNotificationMessage } = notificationSlice.actions;

export default notificationSlice.reducer;