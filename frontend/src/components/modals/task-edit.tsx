import { Modal, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, ReactEventHandler, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/system/Box";
import { set } from 'mongoose';
import TaskViewModal from './task-view-modal';
import { TaskType } from '../type';
import { ITask } from '../../model interfaces/ITask';
import { ISubtask } from '../../model interfaces/ISubtask';

interface TaskEditModalProps {
    initialTask: ITask;
    initialSubtasks: ISubtask[];
    initialColumns: string[];
    onSave: (task: ITask, subtasks: ISubtask[]) => void;
    onClose: () => void;
  }
/**
 * Renders a modal for editing a task.
 * 
 * @param initialTask - The initial task object.
 * @param initialSubtasks - The initial subtasks array.
 * @param initialColumns - The initial columns array.
 * @param onSave - The function to save the changes made to the task.
 * @param onClose - The function to close the modal.
 */


const TaskEdit: React.FC<TaskEditModalProps> = ({ initialTask, initialSubtasks, initialColumns, onSave, onClose }) => {
    const [task, setTask] = useState(initialTask);
    const [subtasks, setSubtasks] = useState(initialSubtasks);
    const [columns, setColumns] = useState(initialColumns);
    const [open, setOpen] = useState(true);
    const [showTaskView, setShowTaskView] = useState(false);

    const handleSubtaskTitleChange = (newValue: string, id: string) => {
        console.log(newValue);
        const updatedSubtasks = [...subtasks];
        updatedSubtasks.forEach((subtask) => {
          if (subtask._id === id) {
            subtask.title = newValue;
          }
        });
        setSubtasks(updatedSubtasks);
    };

    const handleAddNewSubtaskClick = async () => {
        console.log('add new subtask');
        console.log(task);
        try{
            const response = await fetch(`http://localhost:3001/subtasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: 'Add Title', task: task?._id, isComplete: false})
            });
            var result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        setSubtasks([...subtasks, result as ISubtask]);
        setTask({...task, subtasks: [...task.subtasks, result._id]} as ITask);
    };

    const handleDeleteSubtask = async (id: string) =>  {
        console.log(id);
        const updatedSubtasks = [...subtasks];
        const index = updatedSubtasks.findIndex((subtask) => subtask._id === id);
        updatedSubtasks.splice(index, 1);
        setSubtasks(updatedSubtasks);
        try {
            const response = await fetch(`http://localhost:3001/subtasks/${id}`, {
              method: 'DELETE'
            });
            var result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
        
    }

    const handleSaveChangesClick = () => {
        // try{
        //     subtasks.forEach(async (subtask) => {
        //         console.log(subtask);
        //         try {
        //           const response = await fetch(`http://localhost:3001/subtasks/${subtask._id}`, {
        //             method: 'PUT',
        //             headers: {
        //               'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(subtask)
        //           });
        //           var result = await response.json();
        //           console.log(result);
        //         } catch (error) {
        //           console.error('Error fetching data:', error);
        //         }
        //     });
        // }
        // catch (error) {
        //     console.error('Error fetching data:', error);
        // }
        // setOpen(false);
        // setShowTaskView(true);

        console.log(task);
        console.log(subtasks);
        onSave(task, subtasks);
        onClose();
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
        setTask({ ...task, title: event.target.value } as ITask);
    }

    function handleDescChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setTask({ ...task, description: event.target.value } as ITask);
    }

    function handleStatusChange(event: ChangeEvent<HTMLSelectElement>): void {
        setTask({ ...task, status: event.target.value } as ITask);
    }

return (
    <Modal open={open} className="flex items-center justify-center" style={{border: 'solid 1px rgb(9,9,11)'}}>
            <div className="container mx-auto w-[480px] overflow-y-auto max-h-[640px] bg-[#2b2c36] p-8">
            <div className='flex items-center justify-between'>
        <h1 className="text-4xl font-bold mb-4 text-white">Edit Task</h1>
        <button type="button" className="mb-6 text-gray-400 hover:text-red-500" onClick={() => setOpen(false)}>&#x2715;</button>
          </div>
        <form>
        <div className="mb-4">
            <label htmlFor="taskName" className="block mb-2 text-white">
            Task Name
            </label>
            <input
            type="text"
            id="taskName"
            name="taskName"
            value={task?.title}
            className="w-full border border-gray-300 p-2 rounded text-black"
            onChange={handleTitleChange}/>
        </div>
        <div className="mb-4">
            <label htmlFor="taskDescription" className="block mb-2 text-white">
            Description
            </label>
            <textarea
            id="taskDescription"
            name="taskDescription"
            value={task?.description}
            className="w-full border border-gray-300 p-2 rounded text-black"
            onChange={handleDescChange}/>
        </div>
        <h2 className="mb-4 text-white">Subtasks</h2>
        {subtasks.map((subtask) => (
            console.log(subtask._id),
                  <div key={subtask._id} className='flex flex-row w-full justify-between mb-3 gap-2'>
                    <input
                      type="text"
                      value={subtask.title}
                      placeholder='Add Title'
                      onChange={(e) => handleSubtaskTitleChange(e.target.value, subtask._id)}
                      className=' rounded-md px-3.5 py-2 w-full bg-[#2B2C37] border-solid border-gray-500 border-2 text-white focus:outline-none'
                      required
                    />
                    <button type="button" onClick={e => {console.log(subtask._id); handleDeleteSubtask(subtask._id)}}>
                        <CloseIcon style={{fill: '#848fa1'}}/>
                    </button>
                  </div>
        ))}
        <div className="mb-5">
            <button type='button' className="bg-white text-sm text-[#483f95] px-4 py-2 rounded-3xl w-full mt-3" onClick={handleAddNewSubtaskClick}>
                + Add New Subtask
            </button>
        </div>
        <div>
            <label htmlFor="taskStatus" className="block mb-2 text-white">
            Status
            </label>
            <select
            id="taskStatus"
            name="taskStatus"
            className="w-full border border-gray-300 p-2 rounded mb-8 h-10 text-black"
            onChange={handleStatusChange}>
            {
                columns.map((column) => (
                    <option value={column}>{column}</option>
                ))
            }
            </select>
        </div>
        <div>
            <button type='button' className="bg-[#483f95] text-white px-4 py-2 rounded-3xl w-full" onClick={handleSaveChangesClick}>
                Save Changes
            </button>
        </div>
        
        </form>
    </div>
    </Modal>

    );
};


export default TaskEdit;