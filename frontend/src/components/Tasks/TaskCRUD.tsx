import { useEffect, useState } from "react";
import TaskViewModal from "../modals/task-view-modal";
import TaskEditModal from "../modals/task-edit";
import { set } from "mongoose";
import { Modal } from "@mui/material";
import { ITask } from "../../model interfaces/ITask";
import { ISubtask } from "../../model interfaces/ISubtask";

/**
 * Represents a component for creating, reading, updating, and deleting tasks.
 * @param {string} taskId - The ID of the task.
 * @param {boolean} viewModal - A boolean indicating whether to show the view modal.
 * @param {() => void} closeModal - A function to close the modal.
 * @returns {JSX.Element} The TaskCRUD component.
 */

interface TaskCRUDProps {
    taskId?: string;
    viewModal: boolean;
    closeModal: () => void;
  }

export default function TaskCRUD({taskId, viewModal, closeModal}: TaskCRUDProps) {

  const [task, setTask] = useState<ITask>();
  const [subtasks, setSubtasks] = useState<ISubtask[]>([]);
  const [columns, setColumns] = useState([]);
  const [showViewModal, setShowViewModal] = useState(viewModal);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await fetch(`http://localhost:3001/tasks/${taskId}`); // Replace with your API endpoint
        var taskJson = await taskResponse.json();
        setTask(taskJson);

        const subtasksResponse = await fetch(`http://localhost:3001/subtasks/getSubtasksByTask/${taskId}`);
        var subtasksJson = await subtasksResponse.json();
        setSubtasks(subtasksJson);

        const boardResponse = await fetch(`http://localhost:3001/boards/${taskJson.board}`);
        var boardJson = await boardResponse.json();
        console.log(boardJson.columns);
        setColumns(boardJson.columns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [taskId]);

  const openEditModal = () => {
    setShowEditModal(true);
    setShowViewModal(false);
  }

  const closeEditModal = () => {
    setShowEditModal(false);
    setShowViewModal(true);
  }

  const saveChanges = async (updatedTask: ITask, updatedSubtasks: ISubtask[]) => {
    setSubtasks(updatedSubtasks);
    setTask(updatedTask);
    try{
      const response = await fetch(`http://localhost:3001/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      console.log(response);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    try{
      updatedSubtasks.forEach(async (subtask) => {
        const response = await fetch(`http://localhost:3001/subtasks/${subtask._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subtask)
        });
        console.log(response);
      });
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    closeEditModal();
  }

  const handleDeleteTask = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    return (
        <Modal open={true}>
          <h3>Task deleted successfully.</h3>
        </Modal>

    );
  }

  console.log(showViewModal);

  return (
    <div>
      {/* <button className="border-1 border-solid border-black" onClick={() => setShowViewModal(true)}>Show Modal</button> */}
      {showViewModal && task && (<TaskViewModal initialTask={task} initialSubtasks={subtasks} initialColumns={columns} onEdit={openEditModal} onClose={closeModal}/>)}
      {showEditModal && task && (<TaskEditModal initialTask={task} initialSubtasks={subtasks} initialColumns={columns} onSave={saveChanges} onClose={closeEditModal}/>)}
    </div>
  );
}