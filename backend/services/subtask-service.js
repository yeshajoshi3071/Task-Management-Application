import e from 'express';
import Subtask from '../models/subtask.js';
import * as taskService from './task-service.js';



// create subtask
/**
 * Creates a new subtask.
 * 
 * @param {Object} newSubtask - The new subtask object.
 * @returns {Promise<Object>} - The saved subtask object.
 */
export const createSubtask = async (newSubtask) => {
    const subtask = new Subtask(newSubtask);
    const subtaskSaved = await subtask.save();
    const task = await taskService.findTaskById(subtask.task);
    task.subtasks.push(subtaskSaved._id.toString());
    await taskService.updateTask(subtask.task, task);
    return subtaskSaved;
}

// get all subtasks
/**
 * Retrieves subtasks for a given task ID.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<Array>} - A promise that resolves to an array of subtasks.
 */
export const getSubtask = async (taskId) => {
    const task = await taskService.findTaskById(taskId);
    const subtasks = await Subtask.find({ _id: { $in: task.subtasks } }).exec();
    return subtasks;
}

// find subtask by id
/**
 * Finds a subtask by its ID.
 * @param {string} id - The ID of the subtask.
 * @returns {Promise<Object>} - A promise that resolves to the subtask object.
 */
export const findSubtaskById = async (id) => {
    const subtask = await Subtask.findById(id).exec();
    return subtask;
}

// update subtask
/**
 * Updates a subtask with the provided data.
 * @param {Object} updatedSubtask - The updated subtask object.
 * @param {string} id - The ID of the subtask to be updated.
 * @returns {Promise<Object>} - The updated subtask object.
 */
export const updateSubtask = async (updatedSubtask, id) => {
    const subtask = await Subtask.findByIdAndUpdate(id, updatedSubtask, { new: true }).exec();
    return await subtask.save();
}


// delete subtask
/**
 * Deletes a subtask by its ID.
 * 
 * @param {string} id - The ID of the subtask to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the deleted subtask.
 */
export const deleteSubtask = async (id) => {
    const subtask = await Subtask.findById(id).exec();
    const task = await taskService.findTaskById(subtask.task);
    task.subtasks = task.subtasks.remove(subtask._id.toString());
    await taskService.updateTask(subtask.task, task);
    return await Subtask.findByIdAndDelete(id).exec();
}