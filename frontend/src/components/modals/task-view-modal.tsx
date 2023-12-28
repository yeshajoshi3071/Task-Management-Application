import { Checkbox, FormControlLabel, FormGroup, IconButton, Menu, MenuItem, Typography, makeStyles } from "@mui/material";
import Modal from '@mui/material/Modal';
import React, { ChangeEvent, useEffect, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { set } from "mongoose";
import TaskEdit from "./task-edit";
import { TaskType } from "../type";
import { ITask } from "../../model interfaces/ITask";
import { ISubtask } from "../../model interfaces/ISubtask";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import { reloadTask } from "../../store/flags/reloadTasksSlice";
import Swal from "sweetalert2";


interface TaskViewModalProps {
    initialTask: ITask;
    initialSubtasks: ISubtask[]; // Replace with the actual type of your parameter
    initialColumns: string[];
    onEdit: () => void;
    onClose: () => void;
  }
/**
 * TaskViewModal component displays a modal for viewing a task.
 * 
 * @component
 * @param {TaskViewModalProps} initialTask - The initial task object.
 * @param {ISubtask[]} initialSubtasks - The initial array of subtasks.
 * @param {string[]} initialColumns - The initial array of columns.
 * @param {Function} onEdit - The function to handle the edit event.
 * @param {Function} onClose - The function to handle the close event.
 * @returns {JSX.Element} The TaskViewModal component.
 */

const TaskViewModal: React.FC<TaskViewModalProps> = ({ initialTask, initialSubtasks, initialColumns, onEdit, onClose }) => {

  let reloadTaskSliceFlag: boolean = useSelector((state: RootState) => state.reloadTask.value);
  const dispatch = useDispatch<AppDispatch>();

  const [task, setTask] = useState<ITask>(initialTask);
  const [subtasks, setSubtasks] = useState<ISubtask[]>(initialSubtasks);
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDropdownChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };
  const [showTaskEdit, setShowTaskEdit] = useState(false);

  useEffect(() => {
        setTask(initialTask);
        setSubtasks(initialSubtasks);
        setColumns(initialColumns);
        setSelectedOption(task.status);
        setCheckedCount(subtasks.filter((subtask: { isComplete: boolean; }) => subtask.isComplete).length);       
  }, [initialColumns, initialTask, initialSubtasks]);


  const [open, setOpen] = useState(true);

  const showMessage = () => {
    alert('Task updated!');
  }

  const handleEditTaskEvent = () => {
    console.log('edit task');
    onEdit();
  };

  const handleDeleteTaskEvent = async () => {
    console.log('delete task');
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'DELETE'
      });
      var result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Task could not be deleted.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } 
    dispatch(reloadTask(!reloadTaskSliceFlag));
    setOpen(false);
    Swal.fire({
      title: 'Task deleted!',
      text: 'Task has been deleted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };

  // checkbox handler
  const changeSubtaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const subtaskTitle = event.target.name;
    const subtask = subtasks.find((subtask) => subtask.title === subtaskTitle);
    subtask!.isComplete = event.target.checked;
    setSubtasks(subtasks);
  };

  // handle modal close
  const handleClose = async () => {
    // update task
    task!.status = selectedOption;
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      var result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    // update subtasks
    subtasks.forEach(async (subtask) => {
      try {
        const response = await fetch(`http://localhost:3001/subtasks/${subtask._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subtask)
        });
        var result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
    // setOpen(false);
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="flex items-center justify-center">
      <div className="flex flex-col items-start justify-start w-[480px] overflow-y-auto max-h-[640px] bg-[#2b2c36] p-8 w-120 h-93" >
        <div className="mb-6 w-full flex justify-between align-middle items-center">
          <Typography className="text-white text-lg">
            {task?.title}
          </Typography>
          <div className='flex items-center justify-between'>
          <IconButton className="align-top" aria-controls={openMenu ? 'task-action-menu' : undefined} aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined} onClick={handleMenuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </IconButton>
          <button type="button" className="ml-4 text-gray-400 hover:text-red-500" onClick={() => setOpen(false)}>&#x2715;</button>
          </div>
          <Menu
            id="task-action-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleEditTaskEvent}>Edit Task</MenuItem>
            <MenuItem onClick={handleDeleteTaskEvent}>Delete Task</MenuItem>
          </Menu>
        </div>

        <div className="mb-4 w-full">
          <Typography className="text text-xs text-[#848fa1]">
            Description
          </Typography>
        </div>

        <div className="mb-4 w-full">
          <Typography className="text text-xs text-white">
            {task?.description}
          </Typography>
        </div>
        
        <div className="mb-4 w-full">
          <Typography className="text text-xs text-[#848fa1]">
            Subtasks ({checkedCount} of {subtasks?.length})
          </Typography>
        </div>

        <FormGroup onChange={handleCheckboxChange} className="w-full">
          {subtasks?.map((subtask) => (
            <div className="flex h-10.5 w-104 rounded-[4px] bg-[#20212c] hover:bg-[#393959] mt-2 w-full">
              <FormControlLabel control={<Checkbox checked={subtask.isComplete} onChange={changeSubtaskStatus} name={subtask.title}/>} label={subtask.title} className="text-white pl-4" />
            </div>)
          )}
        </FormGroup>

        <div className="mt-6">
          <div className="mb-2">
            <Typography className="text text-xs text-white">
              Current Status
            </Typography>
          </div>
        </div>

        
        <div className="w-full border-solid border-1px border-[#828fa3]">
          <Select onChange={handleDropdownChange} value={selectedOption} className="w-full custom-dropdow" style={{color: 'white', outline: '1px '}}>
              {columns.map((column) => (
                <MenuItem value={column} className="bg-red-300">{column}</MenuItem>
              ))}
          </Select>
        </div>
          
          
        </div>
    
    </Modal>
    {/* {showTaskEdit && task && subtasks && columns && <TaskEdit initialTask={task} initialSubtasks={subtasks} initialColumns={board?.columns} onSave={() => openViewModal(task, setShowFalse)}/>} */}
    
    </div>

  );
}

export default TaskViewModal;