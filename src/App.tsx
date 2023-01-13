import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active"

export type Todolists = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true}, // task
        {id: v1(), title: "JS", isDone: true},   // task
        {id: v1(), title: "ReactJS", isDone: false},   // task
        {id: v1(), title: "Redux", isDone: true}   // task
    ])

    function changeFilter(filterValue: FilterValueType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
        }
        setTodolists([...todolists])

    }

    function removeTask(id: string) {
        const filtredTasks = tasks.filter(t => t.id !== id)
        setTasks(filtredTasks)
    }

    function addTask(title: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskId)
        if (task) task.isDone = isDone
        setTasks([...tasks])
    }

    const [todolists, setTodolists] = useState<Todolists[]>([
            {id: v1(), title: "What to learn", filter: "all"},
            {id: v1(), title: "Learn and listen", filter: "all"},
        ]
    )

    return (
        <div className="App">
            {todolists.map((tl) => {
                // функция вызовется столько раз сколько объектов в тудулисте
                let tasksForTodolist = tasks
// фильтр берем из тудулиста
                if (tl.filter === "completed") tasksForTodolist = tasks.filter(t => t.isDone)

                if (tl.filter === "completed") tasksForTodolist = tasks.filter(t => !t.isDone)

                return <Todolist
                    todolistId={tl.id}
                    key={tl.id}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                />
            })}
        </div>
    );
}

export default App;
