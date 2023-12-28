import Task from '../models/task.js';
import * as userService from './user-service.js';
import * as boardService from './board-service.js';

//Save the task
/**
 * Creates a new task and saves it to the database.
 * @param {Object} completeTask - The complete task object.
 * @returns {Promise<Object>} - The response object containing the saved task.
 */
export const createTask = async (completeTask) => {
    completeTask.dueDate = new Date();
    const task = new Task(completeTask);
    const response = await task.save();
    const board = await boardService.findById(task.board);
    board.tasks.push(response._id.toString());
    await boardService.update(task.board, board);
    return response;
}

//Delete the task
/**
 * Removes a task by its ID.
 * 
 * @param {string} id - The ID of the task to be removed.
 * @returns {Promise<Object>} - A promise that resolves to the deleted task.
 */
export const removeTask = async (id) => {
    //Find the board by id and remove it
    const task = await Task.findById(id).exec();
    const board = await boardService.findById(task.board);
    board.tasks = board.tasks.remove(task._id.toString());
    await boardService.update(task.board, board);
    return await Task.findByIdAndDelete(id).exec();
}

//Update the task by id
/**
 * Updates a task by its ID.
 * @param {string} id - The ID of the task to be updated.
 * @param {object} updatedTask - The updated task object.
 * @returns {Promise<object>} - The updated task object.
 */
export const updateTask = async (id, updatedTask) => {
    // find the task by id
    const task = await Task.findByIdAndUpdate(id, updatedTask, {new : true}).exec();

    // return the response
    return task;
}

//Find the task by id
/**
 * Finds a task by its ID.
 * @param {string} id - The ID of the task.
 * @returns {Promise<object>} - A promise that resolves to the task object.
 */
export const findTaskById = async (id) => {
    // find the task by id
    const task = await Task.findById(id).exec();
    // return the task
    return task;
}

// get all tasks by board id
/**
 * Retrieves tasks by board ID.
 * @param {string} boardId - The ID of the board.
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks.
 */
export const getTasksByBoardId = async (boardId) => {
    const board = await boardService.findById(boardId);
    const tasks = await Task.find({ _id: { $in: board.tasks } }).exec();
    return tasks;
}

// get all tasks by column id and board id
/**
 * Retrieves tasks by column name and board ID.
 * @param {string} columnName - The name of the column.
 * @param {string} boardId - The ID of the board.
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks.
 */
export const getTasksByColumnNameAndBoardId = async (columnName, boardId) => {
    const board = await boardService.findById(boardId);
    var  tasks = await Task.find({ _id: { $in: board.tasks }}).exec();
    tasks = tasks.filter(task => task.status === columnName);
    return tasks;
}