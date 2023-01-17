import React, {ChangeEvent} from "react";
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useAutoAnimate} from "@formkit/auto-animate/react";


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
    changeTodolistFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title : string) => void
}

export function Todolist(props: PropsType) {
    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const onAllClickHandler = () => {
        props.changeTodolistFilter("all", props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeTodolistFilter("active", props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeTodolistFilter("completed", props.todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId,title)
    }

    return <div>
        {/*кнопка удаления тудулиста*/}
        <h3><EditableSpan title={props.title} onNewTitleChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
        </h3>
        <div>
            <AddItemForm addItem={(newTitle) => props.addTask(newTitle, props.todolistId)}/>
        </div>
        <ul ref={listRef}>

            {props.tasks.map(t => {
                    const onRemoveTask = () => {
                        props.removeTask(t.id, props.todolistId)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, newTitle)
                    }

                    return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />

                        <EditableSpan title={t.title}
                                      onNewTitleChange={changeTaskTitle}/>
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

