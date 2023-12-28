import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
const activeTaskSlice = createSlice({
  name: "activetask",
  initialState,
  reducers: {
    //Set the active task slice
    setActiveTask: (state, action: PayloadAction<TaskType | null>) => {
        state.value = action.payload
    },
  },
});

export const { setActiveTask } = activeTaskSlice.actions;

export default activeTaskSlice.reducer;