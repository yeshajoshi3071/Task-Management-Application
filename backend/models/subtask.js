import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * @typedef {Object} SubtaskSchema
 * @property {string} title - The title of the subtask.
 * @property {string} task - The task associated with the subtask.
 * @property {boolean} isComplete - Indicates whether the subtask is complete or not.
 */
const SubtaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
},
{
    versionKey: false
});

const SubtaskModel = mongoose.model('subtasks', SubtaskSchema);

export default SubtaskModel;