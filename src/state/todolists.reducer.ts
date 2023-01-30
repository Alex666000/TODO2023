// согласно прописаному type в этом action (инструкции) я поменяю state
import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

type StateType = TodolistType[]

type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export  type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state
                .map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state
                .map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST", id: todolistId
    }
}
export const addTodolistAC = (newTodolistTitle: string,todolistId: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()
    }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE", id, title
    }
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER", filter, id
    }
}


// tests 8 todolist document
