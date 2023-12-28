import * as subtaskService from '../services/subtask-service.js';
import mongoose from 'mongoose';
import { setResponse, setErrorResponse } from './response-handler.js';  

/**
 * Creates a new subtask.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the subtask is created.
 */
export const createSubtask = async (req, res) => {
    try {
        const reqBody = {...req.body};
        const subtask = await subtaskService.createSubtask(reqBody);
        setResponse(subtask, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Retrieves subtasks by task ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const getSubtasksByTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const subtask = await subtaskService.getSubtask(taskId);
        setResponse(subtask, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Finds a subtask by its ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the subtask is found and the response is set.
 */
export const findSubtaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const subtask = await subtaskService.findSubtaskById(id);
        setResponse(subtask, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Updates a subtask.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the subtask is updated.
 */
export const updateSubtask = async (req, res) => {
    try {
        const id = req.params.id;
        const reqBody = {...req.body};
        const subtask = await subtaskService.updateSubtask(reqBody, id);
        setResponse(subtask, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Deletes a subtask.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the subtask is deleted successfully.
 * @throws {Error} - If an error occurs while deleting the subtask.
 */
export const deleteSubtask = async (req, res) => {
    try {
        const id = req.params.id;
        await subtaskService.deleteSubtask(id);
        setResponse({ "message": "Subtask deleted successfully."}, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

