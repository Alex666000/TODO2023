import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: true}
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
        const newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }



    return (
        <div className="App">
            <Todolist
                addTask={addTask}
                changeFilter={changeFilter}
                removeTask={removeTask}
                title="What to learn"
                tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;
