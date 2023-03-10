// согласно прописаному type в этом action (инструкции) я поменяю state
import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists.reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    Id: string,
    isDone: boolean,
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string,
    title: string,

}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType | AddTodolistActionType
    | RemoveTodolistActionType | ChangeTaskTitleActionType


const initialState: TasksStateType = {
    [todolistId1]:
        [
            {id: v1(), title: "HTML&CSS", isDone: true}, // task
            {id: v1(), title: "JS", isDone: true},   // task
            {id: v1(), title: "ReactJS", isDone: false},   // task
            {id: v1(), title: "Redux", isDone: true}   // task
        ],
    [todolistId2]:
        [
            {id: v1(), title: "Book", isDone: true}, // task
            {id: v1(), title: "Milk", isDone: true},   // task
        ],
}

// редюсер - чистая функция меняющая конкретный подстейт store-а
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // return {
            //     ...state,
            //     [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            // }
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            // делаем результирующий массив без таски
            const filteredTasks = tasks.filter(task => task.id !== action.taskId)
            // изменяем таски в новом массиве
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const newTask = {id: "4", title: action.title, isDone: false}
            //
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId]
            // const newTasks = [...tasks, newTask]
            // // с учетом того что выше делаем новый массив тасок
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy

            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }

        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.Id ? {
                        ...t, isDone: action.isDone
                    } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {
                        ...t, title: action.title
                    } : t)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK", taskId, todolistId
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK", title, todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS", Id: taskId, isDone, todolistId
    }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE", taskId: taskId, title: newTitle, todolistId: todolistId
    }
}

