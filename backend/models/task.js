import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Represents the schema for a task in the application.
 *
 * @typedef {Object} TaskSchema
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {Date} dueDate - The due date of the task.
 * @property {string} status - The status of the task.
 * @property {string} label - The label of the task.
 * @property {string} attachmentPath - The path to the attachment of the task.
 * @property {string[]} subtasks - The subtasks of the task.
 * @property {string} priority - The priority of the task.
 * @property {number} index - The index of the task.
 * @property {string} board - The board the task belongs to.
 */
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    attachmentPath: {
        type: String,
        required: false
    },
    subtasks: [{
        type: String,
        required: false
    }],
    priority: {
        type: String,
        required: false
    },
    index: {
        type: Number,
        required: true,
    },
    board: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const TaskModel = mongoose.model('task', TaskSchema);

export default TaskModel;