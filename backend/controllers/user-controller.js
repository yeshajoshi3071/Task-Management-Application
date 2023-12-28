import * as userService from '../services/user-service.js';
import mongoose from 'mongoose';
import { setResponse, setErrorResponse } from './response-handler.js';  

/**
 * Creates a new user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
 */
export const createUser = async (req, res) => {
    try {
        const reqBody = {...req.body};
        const user = await userService.createUser(reqBody);
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Retrieves all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const getUsers = async (req, res) => {
    try {
        const user = await userService.getUsers();
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Finds a user by their ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is found and the response is set.
 */
export const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.findUserById(id);
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Finds a user by email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is found and the response is set.
 */
export const findUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userService.findUserByEmail(email);
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Updates a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const reqBody = {...req.body};
        const user = await userService.updateUser(reqBody, id);
        setResponse(user, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}

/**
 * Deletes a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userService.deleteUser(id);
        setResponse({ "message": "User deleted successfully."}, res);
    } catch (error) {
        setErrorResponse(error, res);
    }
}