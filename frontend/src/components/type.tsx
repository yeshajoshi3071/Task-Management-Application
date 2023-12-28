/**
 * Represents the type definition for a board.
 */
export type BoardType = {
    user?: string,
    columns: string[];
    name: string;
    tasks: string[];
    _id?: string;
}

/**
 * Represents the type definition for a task.
 */
export type TaskType = {
    board?: string,
    description: string,
    index: number,
    status: string,
    subtasks: string[],
    title: string,
    _id?: string
}

/**
 * Represents the type definition for a user.
 */
export type UserType = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    phoneNo?: string,
    boards?: string[],
    _id?: string
}

/**
 * Represents the type definition for a column.
 */
export type ColumnType = {
    columnTitle: string,
    tasksObjectArray: TaskType[],
    index: number,
    setTasksObjectArray: React.Dispatch<React.SetStateAction<TaskType[]>>
}