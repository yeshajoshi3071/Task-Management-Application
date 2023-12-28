import Board from "../models/board.js";
import * as userService from "./user-service.js"

//Save the board to the db
/**
 * Saves a complete board.
 * 
 * @param {Object} completeBoard - The complete board object to be saved.
 * @returns {Promise<Object>} - A promise that resolves to the saved board object.
 */
export const save = async (completeBoard) => {
  
    const board = new Board(completeBoard);
    const response = await board.save();
    const user = await userService.findUserById(board.user);
    user.boards.push(response._id.toString());
   await userService.updateUser(user, board.user);
    return response;
}

//Find the boards
/**
 * Finds all the boards associated with a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of user boards.
 */
export const find = async (userId) => {
    //Find all the boards in the mongodb if the params is empty object
    const user = await userService.findUserById(userId);
    let userBoards = [];
    if(user.boards.length > 0){
        userBoards = await Board.find({ _id: { $in: user.boards } }).exec();
    }
    return userBoards;
}

//Remove the board
/**
 * Removes a board by its ID.
 * 
 * @param {string} id - The ID of the board to be removed.
 * @returns {Promise<Object>} - A promise that resolves to the deleted board.
 */
export const remove = async (id) => {
    //Find the board by id and remove it
    const board = await Board.findById(id).exec();
    const user = await userService.findUserById(board.user);
    user.boards = user.boards.remove(board._id.toString());
    await userService.updateUser(user, user._id.toString());
    return await Board.findByIdAndDelete(id).exec();
}

//Update the board by id
/**
 * Updates a board by its ID.
 * @param {string} id - The ID of the board to update.
 * @param {object} updatedBoard - The updated board object.
 * @returns {Promise<object>} - The updated board.
 */
export const update = async (id, updatedBoard) => {
    //Find the board by id
    const board = await Board.findByIdAndUpdate(id, updatedBoard, { new: true }).exec();
    //return the response
    return board;
}

//Find the board by id
/**
 * Find a board by its ID.
 * @param {string} id - The ID of the board.
 * @returns {Promise<Object>} - The board object.
 */
export const findById = async(id) => {
    //Find the board by id
    const board = await Board.findById(id).exec();
    //Return the board
    return board;
}