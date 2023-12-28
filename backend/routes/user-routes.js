import express from 'express';
import * as userController from '../controllers/user-controller.js'

const router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers);


router.route('/:id')
    .get(userController.findUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/email/:email')
    .get(userController.findUserByEmail)

export default router;