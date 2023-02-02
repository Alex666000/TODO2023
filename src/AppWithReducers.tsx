import React, {useReducer} from "react";
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Menu} from "@mui/icons-material";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists.reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task.reducer";
// import {FilterValueType} from "./AppWithRedux";
//
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }
//
// function AppWithReducers() {
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
//             {id: todolistId1, title: "What to learn", filter: "all"},
//             {id: todolistId2, title: "Learn and listen", filter: "all"},
//         ]
//     )
//     const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         // id todolist-а 1:
//         [todolistId1]:
//         // таски
//         // 1 - first array tasks:
//             [
//                 {id: v1(), title: "HTML&CSS", isDone: true}, // task
//                 {id: v1(), title: "JS", isDone: true},   // task
//                 {id: v1(), title: "ReactJS", isDone: false},   // task
//                 {id: v1(), title: "Redux", isDone: true}   // task
//             ],
//         // id todolist-а 2:
//         [todolistId2]:
//         // таски
//         // 2 - second array tasks:
//             [
//                 {id: v1(), title: "Book", isDone: true}, // task
//                 {id: v1(), title: "Milk", isDone: true},   // task
//             ],
//     })
//
//     function changeFilterToTodolist(filterValue: FilterValueType, todolistId: string) {
//         dispatchToTodolistsReducer(changeTodolistFilterAC(filterValue, todolistId))
//     }
//
//     function removeTodolist(todolistId: string) {
//         const action = removeTodolistAC(todolistId)
//         dispatchToTodolistsReducer(action)
//         dispatchToTasksReducer(action)
//     }
//
//     function changeTodolistTitle(todolistId: string, newTitle: string) {
//         dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle))
//     }
//
//     function removeTask(id: string, todolistId: string) {
//         dispatchToTasksReducer(removeTaskAC(id, todolistId))
//     }
//
//     function addTask(title: string, todolistId: string) {
//         dispatchToTasksReducer(addTaskAC(title, todolistId))
//     }
//
//     function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
//         dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
//     }
//
//     function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
//         dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
//     }
//
//     function addTodolist(newTitle: string) {
//         const action = addTodolistAC(newTitle)
//         dispatchToTodolistsReducer(action)
//         dispatchToTasksReducer(action)
//     }
//
//     return (
//
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography
//                         variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//                 <Grid>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//
//                 <Grid spacing={3}>
//                     {todolists.map((tl) => {
//                         // функция вызовется столько раз сколько объектов в тудулисте
//                         let tasksForTodolist = tasks[tl.id]
//
//                         if (tl.filter === "completed") tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
//
//                         if (tl.filter === "completed") tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
//
//                         return <Grid item>
//                             <Paper style={{padding: "10px"}}>
//                                 <Todolist
//                                     todolistId={tl.id}
//                                     key={tl.id}
//                                     changeTaskStatus={changeTaskStatus}
//                                     changeTaskTitle={changeTaskTitle}
//                                     addTask={addTask}
//                                     changeFilterToTodolist={changeFilterToTodolist}
//                                     removeTask={removeTask}
//                                     removeTodolist={removeTodolist}
//                                     changeTodolistTitle={changeTodolistTitle}
//                                     title={tl.title}
//                                     filter={tl.filter}
//                                     tasks={tasksForTodolist}
//                                 />
//                             </Paper>
//
//                         </Grid>
//                     })}
//                 </Grid>
//             </Container>
//
//         </div>
//     );
// }
//
// export default AppWithReducers;
