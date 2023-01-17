import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm";

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    function changeTodolistFilter(filterValue: FilterValueType, todolistId: string) {
        const finedTodolist = todolists.find(tl => tl.id === todolistId)
        if (finedTodolist) {
            finedTodolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTodolist(newTitle: string) {
        const newTodolist: TodolistType = {
            id: todolistId1,
            title: newTitle,
            filter: "all"
        }
       setTodolists([newTodolist,...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function removeTask(taskId: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const filteredTasks = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})

    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false}

        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to lear", filter: "all"}, // todo
        {id: todolistId2, title: "My books", filter: "all"},  // todo
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true}, // task
            {id: v1(), title: "JS", isDone: true},   // task
            {id: v1(), title: "ReactJS", isDone: false},   // task
            {id: v1(), title: "Redux", isDone: true}   // task
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true}, // task
            {id: v1(), title: "Beer", isDone: true},   // task

        ]
    })

    return (

        <div className="App">
            <AddItemForm  addItem={ addTodolist} />

            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === "completed") tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                if (tl.filter === "completed") tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)

                return <Todolist
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                    removeTask={removeTask}
                    title={tl.title}
                    filter={tl.filter}
                    todolistId={tl.id}
                    tasks={tasksForTodolist}/>
            })}
        </div>
    );
}

export default App;


//yarn add  @formkit/auto-animate -D

