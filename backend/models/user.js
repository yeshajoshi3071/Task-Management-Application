import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * UserSchema represents the schema for the user model.
 * @typedef {Object} UserSchema
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} phoneNo - The phone number of the user.
 * @property {Array<string>} boards - The boards associated with the user.
 */
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    phoneNo: {
        type: String,
        required: false
    },
    boards: [{
        type: String,
        required: false
    }]
},
{
    versionKey: false
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;