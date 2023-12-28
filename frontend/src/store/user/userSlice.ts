import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/type";

//Create the initial slice
const initialState = {
  value: "",
};

//Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Set the side bar flag
    setUserSlice: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    deleteUserSlice:(state) => {
      state.value = ""
    }
  },
});

//update user in database 
export const updateUserAsync = createAsyncThunk(
  "user/updateBoardAsync",
  async (user: UserType) => { 
      const data = fetch(`http://localhost:3001/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
      return {
        ...data
      };
  }
);

//get user in database 
export const getUserAsync = createAsyncThunk(
  "user/getUserAsync",
  async (userId: string) => { 
      const data = fetch(`http://localhost:3001/users/${userId}`)
        .then(response => response.json())
      return data;
  }
);

export const { setUserSlice } = userSlice.actions;

export default userSlice.reducer;