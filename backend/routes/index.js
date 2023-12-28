import userRouter from './user-routes.js'
import boardRouter from './board-routes.js'
import taskRouter from './tasks-routes.js'
import subtaskRouter from './subtask-routes.js'

export default (app) => {
    app.use('/users', userRouter);
    app.use('/boards', boardRouter);
    app.use('/tasks', taskRouter);
    app.use('/subtasks', subtaskRouter);
}