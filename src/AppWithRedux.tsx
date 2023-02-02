import React, {useReducer, useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists.reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task.reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    function changeFilterToTodolist(filterValue: FilterValueType, todolistId: string) {
        dispatch(changeTodolistFilterAC(filterValue, todolistId))
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function addTodolist(newTitle: string) {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }


    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }


    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography
                        variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid spacing={3}>
                    {todolists.map((tl) => {
                        // функция вызовется столько раз сколько объектов в тудулисте
                        let tasksForTodolist = tasks[tl.id]

                        if (tl.filter === "completed") tasksForTodolist = tasks[tl.id].filter(t => t.isDone)

                        if (tl.filter === "completed") tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolistId={tl.id}
                                    key={tl.id}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    addTask={addTask}
                                    changeFilterToTodolist={changeFilterToTodolist}
                                    removeTask={removeTask}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForTodolist}
                                />
                            </Paper>

                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
