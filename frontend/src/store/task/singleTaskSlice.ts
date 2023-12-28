import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../components/type";

//Interface for typescript
interface TaskState {
  value: TaskType | null;
}

//Create the initial slice
const initialState: TaskState = {
  value: null,
};

//Create the slice
const singleTaskSlice = createSlice({
  name: "singleTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
        createNewTaskAsync.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
            state.value = action.payload;
        }
    )
  }
});

//create new task in database
export const createNewTaskAsync = createAsyncThunk<TaskType, TaskType>(
    "task/createNewTaskAsync",
    async (task: TaskType) => { 
        const data = fetch(`http://localhost:3001/tasks/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        })
          .then(response => response.json())
        return data;
    }
);

export default singleTaskSlice.reducer;