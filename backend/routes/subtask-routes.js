import express from 'express';
import * as subtaskController from '../controllers/subtask-controller.js'

const router = express.Router();

router.route('/')
    .post(subtaskController.createSubtask);


router.route('/:id')
    .get(subtaskController.findSubtaskById)
    .put(subtaskController.updateSubtask)
    .delete(subtaskController.deleteSubtask);

router.route('/getSubtasksByTask/:taskId')
    .get(subtaskController.getSubtasksByTask);

export default router;