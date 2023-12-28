import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * @typedef {Object} BoardSchema
 * @property {string} name - The name of the board.
 * @property {string[]} columns - An array of column names.
 * @property {string[]} tasks - An array of task ids.
 * @property {string} user - The user associated with the board.
 */
const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    columns: {
        type: [String],
        required: true,

    },
    tasks: [{
        type: String,
        required: false
    }],
    user: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const BoardModel = mongoose.model('board', BoardSchema);

export default BoardModel;