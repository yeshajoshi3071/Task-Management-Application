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
const singleBoardSlice = createSlice({
  name: "singleBoard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
        createNewBoardAsync.fulfilled,
        (state, action: PayloadAction<BoardType>) => {
            state.value = action.payload;
        }
    ).addCase(
      updateBoardAsync.fulfilled,
      (state, action: PayloadAction<BoardType>) => {
          state.value = action.payload;
      }
  ).addCase(
    deleteBoardAsync.fulfilled,
    (state) => {}
)
  }
});

//create new board in database
export const createNewBoardAsync = createAsyncThunk<BoardType, BoardType>(
    "singleBoard/createNewBoardAsync",
    async (board: BoardType) => { 
        const data = fetch(`http://localhost:3001/boards/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(board),
        })
          .then(response => response.json())
        return data;
    }
);

//create new board in database
export const deleteBoardAsync = createAsyncThunk<void, string>(
  "singleBoard/deleteBoardAsync",
  async (boardId: string) => { 
      const data = fetch(`http://localhost:3001/boards/${boardId}`, {
        method: 'DELETE',
        })
  }
);

//update board in database 
export const updateBoardAsync = createAsyncThunk<BoardType, BoardType>(
    "singleBoard/updateBoardAsync",
    async (board: BoardType) => { 
        const data = fetch(`http://localhost:3001/boards/${board._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(board),
        })
          .then(response => response.json())
        return {
          ...data
        };
    }
);

export default singleBoardSlice.reducer;