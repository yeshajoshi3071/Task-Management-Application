import e from 'express';
import User from '../models/user.js';

// create user
/**
 * Creates a new user.
 * @param {Object} newUser - The new user object.
 * @returns {Promise<Object>} - The saved user object.
 */
export const createUser = async (newUser) => {
    const user = new User(newUser);
    return await user.save();
}

// get all users
/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export const getUsers = async () => {
    const users = await User.find().exec();
    return users;
}

// find user by id
/**
 * Finds a user by their ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<Object>} - A promise that resolves to the user object.
 */
export const findUserById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

// Find user by email
/**
 * Finds a user by email.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object|null>} - A promise that resolves to the found user object, or null if not found.
 */
export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email }).exec();
    return user;
};

// update user
/**
 * Updates a user in the database.
 * @param {Object} updatedUser - The updated user object.
 * @param {string} id - The ID of the user to be updated.
 * @returns {Promise<Object>} - The updated user object.
 */
export const updateUser = async (updatedUser, id) => {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
    return await user.save();
}


// delete user
/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id).exec();
}