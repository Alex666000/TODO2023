import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import {Simulate} from "react-dom/test-utils";


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
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.keyCode === 13) {
            props.addTask(newTaskTitle,props.todolistId)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        // если то что ввели в поле пустая строка или ничего не ввели - trim() обрежет пробелы
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(),props.todolistId)
            setNewTaskTitle("")
        }
        setError("Поле обязательно")
    }
    const onAllClickHandler = () => {
        props.changeTodolistFilter("all", props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeTodolistFilter("active", props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeTodolistFilter("completed", props.todolistId)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? "error" : ""}
                value={newTaskTitle}
                onKeyDown={onNewTitleKeyDownHandler}
                onChange={onNewTitleChangeHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>

            {props.tasks.map(t => {
                    const onRemoveTask = () => {
                        props.removeTask(t.id,props.todolistId)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.todolistId)
                    }

                    return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />

                        <span>{t.title}</span>
                        <button onClick={onRemoveTask}>X
                        </button>
                    </li>
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

