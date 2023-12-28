import { Document } from "mongoose";

/**
 * Represents a subtask in a task.
 */
export interface ISubtask extends Document {
    /**
     * The unique identifier of the subtask.
     */
    _id: string;
    /**
     * The title of the subtask.
     */
    title: string;
    /**
     * The parent task of the subtask.
     */
    task: string;
    /**
     * Indicates whether the subtask is complete or not.
     */
    isComplete: boolean;
}