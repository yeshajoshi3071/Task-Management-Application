import { request } from 'express';
import * as taskService from '../services/task-service.js';
import { setResponse, setErrorResponse } from './response-handler.js'

//Controller to create the task
/**
 * Creates a new task.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the task is created.
 */
export const createTask = async (request, response) => {
    try {
        //Creaate shallow copy of the body
        const completeTask = { ...request.body };
        //Call the service to store the task in db
        const task = await taskService.createTask(completeTask);
        //Set the response to be sent to the client
        setResponse(task, response)
    }
    catch(error){
        //Set the error response
        setErrorResponse(error, response);
    }
}

//Controller to delete the task
/**
 * Deletes a task.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted successfully.
 */
export const deleteTask = async (request, response) => {

    try {
        //Get the task id
        const taskId = request.params.id;
        //Remove the task
        await taskService.removeTask(taskId);
        //Set the response
        setResponse({ "message": "Task deleted successfully."}, response);
    }
    catch(error){
        //Set tge error response
        setErrorResponse(error);
    }
}

//Find the task by id
/**
 * Finds a task by its ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the task is found and the response is set.
 */
export const findTaskById = async(request, response) => {
    try {
        //Get the task id
        const taskId = request.params.id;

        //Find the task by id
        const task = await taskService.findTaskById(taskId);
        //Set the response
        setResponse(task, response);
    }
    catch(error){
        //Set the error response
        setErrorResponse(error);
    }
}


//Find the task by id and update it
/**
 * Updates a task.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 */
export const updateTask = async(request, response) => {
    try {
        //Get the task id
        const taskId = request.params.id;
        //Get the task body
        const taskBody = request.body;
        //Update the task
        const task = await taskService.updateTask(taskId, taskBody);
        //Set the response
        setResponse(task, response);
    }
    catch(error){
        //Set the error response
        setErrorResponse(error);
    }
}

//Find the task by board id
/**
 * Retrieves tasks by board ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the tasks are retrieved.
 */
export const getTasksByBoardId = async(request, response) => {
    try {
        //Get the board id
        const boardId = request.params.boardId;
        //Get the tasks
        const tasks = await taskService.getTasksByBoardId(boardId);
        //Set the response
        setResponse(tasks, response);
    }
    catch(error){
        //Set the error response
        setErrorResponse(error);
    }
}

//Find the task by column name and board id
/**
 * Retrieves tasks by column name and board id.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the tasks are retrieved.
 */
export const getTasksByColumnNameAndBoardId = async(request, response) => {
    try {
        //Get the column id
        const columnName = request.params.columnName;
        //Get the board id
        const boardId = request.params.boardId;
        //Get the tasks
        const tasks = await taskService.getTasksByColumnNameAndBoardId(columnName, boardId);
        //Set the response
        setResponse(tasks, response);
    }
    catch(error){
        //Set the error response
        setErrorResponse(error);
    }
}