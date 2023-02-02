import React from "react";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists.reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, Todolist} from "./Todolist";

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


                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolistId={tl.id}
                                    key={tl.id}
                                    changeFilterToTodolist={changeFilterToTodolist}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    title={tl.title}
                                    filter={tl.filter}
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
