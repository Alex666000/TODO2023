import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true}, // task
        {id: v1(), title: "JS", isDone: true},   // task
        {id: v1(), title: "ReactJS", isDone: false},   // task
        {id: v1(), title: "Redux", isDone: true}   // task
    ])
    // console.log(tasks)

    const [filter, setFilter] = useState<FilterValueType>("all")

    let tasksForTodolist = tasks

    if (filter === "completed") tasksForTodolist = tasks.filter(t => t.isDone)

    if (filter === "completed") tasksForTodolist = tasks.filter(t => !t.isDone)


    function changeFilter(filterValue: FilterValueType) {
        setFilter(filterValue)
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


    return (
        <div className="App">
            <Todolist
                changeTaskStatus={changeTaskStatus}
                addTask={addTask}
                changeFilter={changeFilter}
                removeTask={removeTask}
                title="What to learn"
                filter={filter}
                tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;
