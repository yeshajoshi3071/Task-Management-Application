import { Document } from "mongoose";

/**
 * Represents the interface for a board in the application.
 */
export interface IBoard extends Document {
    _id: string;
    name: string;
    columns: string[];
    tasks: string[];
    user: string;
}