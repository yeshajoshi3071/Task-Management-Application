import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/type";

interface UserState {
    value: UserType | null
}
//Create the initial slice
const initialState: UserState = {
  value: null,
};

//Create the slice
const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<UserType>) => {
            state.value = action.payload;
        }
      )
      .addCase(
        getUserAsync.fulfilled,
        (state) => {}
      )
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<UserType>) => {
            state.value = action.payload;
        }
      )
      .addCase(
        getUserByEmailAsync.fulfilled,
        (state, action: PayloadAction<UserType>) => {
            state.value = action.payload;
        }
      )
  }
});

//update user in database 
export const updateUserAsync = createAsyncThunk<UserType, UserType>(
  "user/updateBoardAsync",
  async (user: UserType) => { 
      const response = await fetch(`http://localhost:3001/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data: UserType= await response.json()
      return {
        ...data
      };
  }
);

//update user in database 
export const createUserAsync = createAsyncThunk<UserType, UserType>(
  "user/createUserAsync",
  async (user: UserType) => { 
      const response = await fetch(`http://localhost:3001/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data: UserType= await response.json()
      return {
        ...data
      };
  }
);

//get user in database 
export const getUserAsync = createAsyncThunk<UserType, string>(
  "user/getUserAsync",
  async (userId: string) => { 
      const response = await fetch(`http://localhost:3001/users/${userId}`)
      const data: UserType= await response.json()
      return data;
  }
);


//get user in database 
export const getUserByEmailAsync = createAsyncThunk<UserType, string>(
  "user/getUserByEmailAsync",
  async (email: string) => { 
      const response = await fetch(`http://localhost:3001/users/email/${email}`)
      const data: UserType= await response.json()
      return data;
  }
);

export default singleUserSlice.reducer;