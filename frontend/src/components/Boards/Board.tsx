import { useEffect } from "react"
import DisplayColumn from "../Columns/DisplayColumn";
import { CircularProgress } from "@mui/material";
import { getBoardAsync } from "../../store/active/activeBoardSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import { Navigate, useParams } from "react-router-dom";
import { BoardType } from "../type";
import { reloadBoard } from "../../store/flags/reloadBoardSlice";

/**
 * Renders the Board component.
 * @returns The rendered Board component.
 */


export default function Board() {
  const params = useParams()
  
  let boardData: BoardType | null = useSelector((state: RootState) => state.activeBoard.value);
  let isSidebarOpen: boolean = useSelector((state: RootState) => state.sideBarFlag.value);
  let reloadBoardBool: boolean = useSelector((state: RootState) => state.reloadBoard.value);
  let reloadTaskSliceFlag: boolean = useSelector((state: RootState) => state.reloadTask.value);
 
  
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Fetches the board and its tasks based on the provided ID.
   * 
   * @param {string} paramsId - The ID of the board.
   * @param {function} dispatch - The dispatch function from the Redux store.
   * @param {boolean} reloadBoardBool - A flag indicating whether the board should be reloaded.
   * @param {boolean} reloadTaskSliceFlag - A flag indicating whether the task slice should be reloaded.
   */
  let paramsId: string = params?.id || ""
  useEffect(() => {
    console.log("Inside Board")
    const fetchTasks = async () => {
      await dispatch(getBoardAsync(paramsId));
    };
    fetchTasks(); 
  }, [paramsId, dispatch, reloadBoardBool, reloadTaskSliceFlag]);

  let isLoggedIn: boolean = useSelector((state: RootState) => state.login.value);

  if(!isLoggedIn){
    return (
      <Navigate to="/" />
    )
  }

  
  
  /**
   * Renders the Board component.
   * 
   * @returns The JSX element representing the Board component.
   */
  if (boardData !== null) {
    return (
      <div className="overflow-x-auto h-screen">   
        <div className={!isSidebarOpen ? 'mt-28 ml-12 sm:ml-96' : 'mt-28 ml-72 sm:ml-96'}>
          <DisplayColumn/>
        </div>
      </div>  
    ) 
  } else {
    return (
      <div className="flex h-screen">
        <CircularProgress className="mx-auto self-center"/>
      </div>
    )
  }
}
