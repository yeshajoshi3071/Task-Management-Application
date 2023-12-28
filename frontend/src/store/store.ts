import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import activeTaskReducer from './active/activeTaskSlice';
import activeColumnReducer from './active/activeColumnSlice';
import activeBoardReducer from './active/activeBoardSlice';
import sideBarFlagReducer from './flags/sideBarFlagSlice';
import notificationReducer from './notification/notificationSlice';
import singleTaskReducer from './task/singleTaskSlice';
import singleBoardReducer from './board/singleBoardSlice';
import reloadBoardReducer from './flags/reloadBoardSlice'
import reloadTasksSlice from "./flags/reloadTasksSlice";
import userReducer from './user/userSlice';
import loginReducer from './user/loginSlice'
import singleUserReducer from './user/singleUserAsyncSlice'
import getBoardFromUserReducer from './board/getBoardFromUserSlice'

/**
 * The Redux store configuration.
 */
export const store = configureStore({
  reducer: {
    tasksObjectArray: taskReducer,
    activeTask:activeTaskReducer,
    activeColumn:activeColumnReducer,
    activeBoard:activeBoardReducer,
    sideBarFlag:sideBarFlagReducer,
    notification:notificationReducer,
    singleTask:singleTaskReducer,
    singleBoard:singleBoardReducer,
    reloadBoard:reloadBoardReducer,
    reloadTask:reloadTasksSlice,
    singleUser:userReducer,
    login:loginReducer,
    singleUserObjectFromDb:singleUserReducer,
    getBoardFromUser:getBoardFromUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;