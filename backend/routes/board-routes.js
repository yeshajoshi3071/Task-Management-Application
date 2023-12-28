import * as boardController from "../controllers/board-controller.js";
import express from "express";

const router = express.Router();

router.route('/')
    .post(boardController.createBoard)
    .get(boardController.findBoards);

router.route('/:id')
    .delete(boardController.deleteBoard)
    .put(boardController.updateBoard)
    .get(boardController.findBoardById);

export default router;