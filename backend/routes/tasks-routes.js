import * as tasksController from '../controllers/task-controller.js';
import express from 'express';

const router = express.Router();

router.route('/')
    .post(tasksController.createTask);

router.route('/:id')
    .delete(tasksController.deleteTask)
    .get(tasksController.findTaskById)
    .put(tasksController.updateTask);

router.route('/getTasksByBoard/:boardId')
    .get(tasksController.getTasksByBoardId);

router.route('/getTasksByColumnNameAndBoard/:boardId/:columnName')
    .get(tasksController.getTasksByColumnNameAndBoardId);



export default router;