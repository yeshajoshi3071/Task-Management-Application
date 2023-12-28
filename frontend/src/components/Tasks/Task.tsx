

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskType } from "../type";
import TaskViewModal from "../modals/task-view-modal";
import { useEffect, useState } from "react";
import TaskCRUD from "./TaskCRUD";
import { Console } from "console";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { reloadTask } from "../../store/flags/reloadTasksSlice";

interface Props {
  task: TaskType;
}
/**
 * Renders a task component.
 * @param {Props} props - The component props.
 * @param {Task} props.task - The task object.
 * @returns {JSX.Element} - The task component.
 */

export default function Task({ task }: Props) {
  //Hook for DND
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id || "",
    data: {
      type: "Task",
      task,
    }
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  let reloadTaskSliceFlag: boolean = useSelector((state: RootState) => state.reloadTask.value);
  const dispatch = useDispatch<AppDispatch>();

  const [showViewModal, setShowViewModal] = useState(false);

  //Component to be shown if the task is dragging
  if (isDragging) {
    return (
      <div 
      key={task._id} 
      className="w-72 mb-6 bg-[#2B2C37] h-24	rounded py-7 px-5 font-bold hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab touch-none" 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
    </div>
    );
  }
  //Actual task component
  return (
    <div 
      key={task._id} 
      className="w-72 mb-6 bg-[#2B2C37] h-24	rounded py-7 px-5 font-bold  hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab touch-none text-lg"  
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {console.log("Clicked"); setShowViewModal(true)}}
    >
        {task.title}
        {showViewModal && <TaskCRUD taskId={task._id} viewModal={showViewModal} closeModal={() => {setShowViewModal(false); dispatch(reloadTask(!reloadTaskSliceFlag));}} />}
    </div>
  )
}
