import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BoardType } from "../../components/type";


//Interface for typescript
interface BoardState {
  value: BoardType | null;
}

//Create the initial slice
const initialState: BoardState = {
  value: null,
};

//Create the slice
const activeBoardSlice = createSlice({
  name: "activeboard",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<BoardType | null>) => {
      state.value = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBoardAsync.fulfilled,
        (state, action: PayloadAction<BoardType>) => {
            state.value = action.payload;
        }
      )
  }
});


export const { setActiveBoard } = activeBoardSlice.actions;

//Get Board based on board id
export const getBoardAsync = createAsyncThunk<BoardType, string>(
    "activeboard/getBoardAsync",
    async (boardId: string) => {
        const board: BoardType = await fetch(`http://localhost:3001/boards/${boardId}`).then(response => response.json())
        return {... board};
    }
);

export default activeBoardSlice.reducer;