import React, {ChangeEvent} from "react";
import {FilterValueType} from "./AppWithRedux";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task.reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    filter: FilterValueType
    todolistId: string
    changeFilterToTodolist: (filterValue: FilterValueType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const onAllClickHandler = () => {
        props.changeFilterToTodolist("all", props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeFilterToTodolist("active", props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilterToTodolist("completed", props.todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }

    let tasksForTodolist = tasks

    if (props.filter === "completed") tasksForTodolist = tasks.filter(t => t.isDone)

    if (props.filter === "completed") tasksForTodolist = tasks.filter(t => !t.isDone)

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul ref={listRef}>

            {tasksForTodolist.map(t => {
                    const onRemoveTask = () => {
                        dispatch(removeTaskAC(t.id, props.todolistId))
                    }

                    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todolistId))
                    }

                    const onTitleChangeHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, props.todolistId))
                    }

                    return (
                        <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onStatusChangeHandler}
                            />
                            <EditableSpan
                                title={t.title}
                                onChange={onTitleChangeHandler}
                            />
                            <IconButton
                                onClick={onRemoveTask}>
                                <Delete/>
                            </IconButton>
                        </li>)
                }
            )}
        </ul>
        <div>
            {/* variant - замена className*/}
            <Button
                variant={props.filter === "all" ? "contained" : "text"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={"primary"}
                variant={props.filter === "active" ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={"secondary"}
                variant={props.filter === "completed" ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

