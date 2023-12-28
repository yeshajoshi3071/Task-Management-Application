import { Document } from "mongoose";

/**
 * Represents a user in the system.
 */
export interface IUser extends Document {
    /**
     * The unique identifier of the user.
     */
    _id: string;
    /**
     * The first name of the user.
     */
    firstName: string;
    /**
     * The last name of the user.
     */
    lastName: string;
    /**
     * The email address of the user.
     */
    email: string;
    /**
     * The password of the user.
     */
    password: string;
    /**
     * The phone number of the user.
     */
    phoneNo: string;
    /**
     * The boards associated with the user.
     */
    boards: string[];
}