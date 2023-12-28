import { SortableContext } from "@dnd-kit/sortable";
import { BoardType, TaskType } from "../type";
import Task from "../Tasks/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import {getTaskFromBoardAsync} from "../../store/task/taskSlice"

interface Props {
  columnTitle: string;
  index: number;
}
/**
 * Renders a column component.
 * @param columnTitle - The title of the column.
 * @param index - The index of the column.
 * @returns The rendered column component.
 */

export default function Column({ columnTitle, index}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  //State
  let tasksObjectArray: TaskType[] = useSelector((state: RootState) => state.tasksObjectArray.value);
  const emptyBoard: BoardType= {
    columns: [],
    name: "",
    tasks: [],
    _id: ""
  }

  let boardData: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;
  let reloadBoard: boolean = useSelector((state: RootState) => state.reloadBoard.value);
  let reloadTaskSliceFlag: boolean = useSelector((state: RootState) => state.reloadTask.value);

  /**
   * Fetches tasks from the board asynchronously.
   * @returns {void}
   */
  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getTaskFromBoardAsync(boardData));
    };
    fetchTasks();
  }, [boardData, dispatch, reloadBoard, reloadTaskSliceFlag]);

  //Hook for DND
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: index,
    data: {
      type: "Column",
      column: {
        columnTitle,
        tasksObjectArray,
        index,
      },
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  //If Task is dragging
  if (isDragging) {
    return (
      <div 
      key={index} 
      className="w-72 border border-sky-500" 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      />
    );
  }


  if(tasksObjectArray.length > 0){
    const filterTasksData = tasksObjectArray.filter(task => task.status === columnTitle)
  
    //Display task previews on column
    const tasksPreviewData = filterTasksData.map(taskPreviewData => {
      return(
        <Task key={taskPreviewData._id} task={taskPreviewData} />
      )
    })
  
    const sortedTasksPreviewData = tasksPreviewData.sort(
      (taskA, taskB) => taskA.props.task.index - taskB.props.task.index
    );
  
    //Get all ids
    const tasksIds = sortedTasksPreviewData.map(task => task.props.task.index)

    
    return (
      <div className="w-72" >
      {/* Column Title */}
      <div key={index} className="mb-6 text-zinc-400 text-lg font-semibold" ref={setNodeRef} style={style} >{columnTitle}</div>
      {/* Tasks */}
      {<SortableContext items={tasksIds}>{sortedTasksPreviewData}</SortableContext>}
      </div>
    )
  }
  return (
    <div className="w-72" >
      {/* Column Title */}
      <div key={index} className="mb-6 text-zinc-400 text-lg font-semibold" ref={setNodeRef} style={style} >{columnTitle}</div>
    </div>
  )
}