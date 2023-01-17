import React, {ChangeEvent} from "react";
import {FilterValueType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (todolistId: string,taskId: string, newTitle: string, ) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const onAllClickHandler = () => {
        props.changeFilter("all", props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul ref={listRef}>

            {props.tasks.map(t => {
                    const onRemoveTask = () => {
                        props.removeTask(t.id, props.todolistId)
                    }

                    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }

                    const onTitleChangeHandler =  (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId,t.id, newTitle, )
                    }

                    return (
                        <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onStatusChangeHandler}
                            />
                            <EditableSpan
                                title={t.title}
                                onChange={onTitleChangeHandler}
                            />
                            <button onClick={onRemoveTask}>X
                            </button>
                        </li>)
                }
            )}
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

