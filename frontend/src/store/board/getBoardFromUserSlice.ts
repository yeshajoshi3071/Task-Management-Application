import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BoardType } from "../../components/type";

interface Board {
    _id: string;
    name: string;
    columns: string[];
    tasks: any[];
}

//Interface for typescript
interface BoardState {
  value: Board[];
}

//Create the initial slice
const initialState: BoardState = {
  value: [],
};



//Create the slice
const getBoardFromUserSlice = createSlice({
  name: "getBoardFromUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
        getBoardFromUserAsync.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
            state.value = action.payload;
        }
    )
  }
});

//create new board in database
export const getBoardFromUserAsync = createAsyncThunk<Board[], string>(
    "getBoardFromUser/getBoardFromUserAsync",
    async (userId: string) => { 
        const data = fetch(`http://localhost:3001/boards/?userId=${userId}`)
          .then(response => response.json())
        return data;
    }
);



export default getBoardFromUserSlice.reducer;