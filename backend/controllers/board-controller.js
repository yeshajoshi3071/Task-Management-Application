import * as boardService from '../services/board-service.js';
import { setResponse, setErrorResponse } from './response-handler.js'

//Controller to create the board
/**
 * Creates a new board.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the board is created.
 */
export const createBoard = async (request, response) => {
    try {
        //Creaate shallow copy of the body
        const completeBoard = { ...request.body };
        //Call the service to store the board in db
        const board = await boardService.save(completeBoard);
        //Set the response to be sent to the client
        setResponse(board, response)
    }
    catch(error){
        //Set the error response
        setErrorResponse(error, response);
    }
}

//Controller to find all boards or based on query params 
/**
 * Find boards based on the provided user ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the boards are found.
 */
export const findBoards = async (request, response) => {
    try {
        //Save the query params
        const userId = request.query.userId;
        //Call the find board service
        const boards = await boardService.find(userId);
        //Set the positive response
        setResponse(boards, response)
    }catch(error){
        //Set the error response
        setErrorResponse(error, response);
    }
}

//Controller to delete the board
/**
 * Deletes a board.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the board is deleted successfully.
 */
export const deleteBoard = async (request, response) => {
    
    try {
        //Get the board id
        const boardId = request.params.id;
        //Remove the board
        await boardService.remove(boardId);
        //Set the response
        setResponse({ "message": "Board deleted successfully."}, response);
    }
    catch(error){
        //Set tge error response
        setErrorResponse(error);
    }
}

//Find the board by id and update it
/**
 * Update a board.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the board is updated.
 * @throws {Error} - If there is an error updating the board.
 */
export const updateBoard = async (request, response) => {
    try {
        //Get the board id
        const boardId = request.params.id;

        //Get the response to be updated
        const updatedBoard = {...request.body};

        //Call the update service
        const board = await boardService.update(boardId, updatedBoard);

        //Set the response to be sent back to client 
        setResponse(board, response);
    }
    catch(error){
        //Set the error response to be sent back to the client
        setErrorResponse(error, response);
    }
}

//Find the board by id
/**
 * Find a board by its ID.
 * 
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} - A promise that resolves when the board is found and the response is set.
 */
export const findBoardById = async(request, response) => {
    try {
        //Get the board id
        const boardId = request.params.id;
        
        //Find the board by id
        const board = await boardService.findById(boardId);

        //Set the response
        setResponse(board, response)
    }
    catch(error){
        //Set the error response
        setErrorResponse(error, response);
    }
}