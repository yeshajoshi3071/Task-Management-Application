import Column from "./Column";
import { BoardType, TaskType } from '../type';
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import Task from "../Tasks/Task";
import { ColumnType } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import {getTaskFromBoardAsync, swapTwoTasksIndex, addTaskToColumn, updateTaskFromBoardAsync} from "../../store/task/taskSlice"
import {setActiveColumn} from '../../store/active/activeColumnSlice';
import {setActiveTask} from "../../store/active/activeTaskSlice";
import Loading from "../Loading/Loading";
import CreateNewColumn from "./CreateNewColumn";
import { useParams } from "react-router-dom";
/**
 * Renders the display column component.
 * 
 * @returns The JSX element representing the display column component.
 */

export default function DisplayColumn() {
  const params = useParams()

  const emptyBoard: BoardType= {
    columns: [],
    name: "",
    tasks: [],
    _id: ""
  }
  let boardData: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;
  let reloadTaskSliceFlag: boolean = useSelector((state: RootState) => state.reloadTask.value);
  //State
  let tasksObjectArray: TaskType[] = useSelector((state: RootState) => state.tasksObjectArray.value);
  let activeColumn: ColumnType | null = useSelector((state: RootState) => state.activeColumn.value);
  let activeTask: TaskType | null = useSelector((state: RootState) => state.activeTask.value);
  const [refreshTasksData, setRefreshTasksData ] = useState(true)
  let reloadBoard: boolean = useSelector((state: RootState) => state.reloadBoard.value);

  const dispatch = useDispatch<AppDispatch>();

  //Drag will trigger only after 10px drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  //Get all the tasks for a board
  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTaskFromBoardAsync(boardData));
    };
    if(refreshTasksData){
      fetchTasks();
      setRefreshTasksData(false);
    }
  }, [refreshTasksData, boardData, dispatch, params, reloadBoard, reloadTaskSliceFlag]);

  //Update the task, in database after it is placed in different location on kanban board
  useEffect(() => {
    const fetchTasks = async () => {
     await dispatch(updateTaskFromBoardAsync({boardData,tasksObjectArray }));
    }
    fetchTasks();
  }, [tasksObjectArray, boardData, dispatch, params, reloadBoard, reloadTaskSliceFlag]);
  
  //Array of all columns in the board
  let allColumns;
  let columns;
  
  columns = boardData?.columns;
  allColumns = columns?.map((column, index) => <Column key={index} columnTitle={column} index={index}/>);
 

  

  //On drag start set the activeTask and activeColumn state
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      const activeTask: TaskType | null = event.active.data.current.task;
      dispatch(setActiveTask(activeTask))
      return;
    }
    if (event.active.data.current?.type === "Column") {
      const activeColumn: ColumnType | null = event.active.data.current.column;
      dispatch(setActiveColumn(activeColumn));
      return;
    }
  }

  //Perform action based on dragging task is over another task or column
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return; //If over is undefined
    //Get id
    const activeId = active.id;
    const overId = over.id;
    //If it is same task return
    if (activeId === overId) return;
    //Check if both task are Task
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return; //Return if undefined
    //Swap the id of both task
    if (isActiveATask && isOverATask) {
      dispatch(swapTwoTasksIndex({activeId,overId,}))
    }
    //If over column change the column id of task
    const isOverAColumn = over.data.current?.type === "Column"; 
    if (isActiveATask && isOverAColumn) {
      dispatch(addTaskToColumn({activeId,overId,boardData}));
    }
  }

  //On drag end set the active column and task state to null
  function onDragEnd(event: DragEndEvent) {
    dispatch(setActiveTask(null));
    dispatch(setActiveColumn(null));
  }

  if(allColumns){
    return (
      <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} sensors={sensors}>
      <div>
        {/* Create new column button */}
        <div className="flex flex-row gap-x-9">
        <div className="flex flex-row gap-x-9">{[...allColumns, <CreateNewColumn key="add_new_column" />]}</div>
        </div>
      </div>
      {/* Portal for getting the component outside DOM */}
      {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column columnTitle={activeColumn.columnTitle} index={activeColumn.index}/>
            )}
            {activeTask && (
              <Task
                task={activeTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    )
  }
  else {
    return (
      <></>
    )
  }
}