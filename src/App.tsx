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
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "Learn and listen", filter: "all"},
        ]
    )
    const [tasksObj, setTasks] = useState<TasksStateType>({
        // id todolist-а 1:
        [todolistId1]:
        // таски
        // 1 - first array tasks:
            [
                {id: v1(), title: "HTML&CSS", isDone: true}, // task
                {id: v1(), title: "JS", isDone: true},   // task
                {id: v1(), title: "ReactJS", isDone: false},   // task
                {id: v1(), title: "Redux", isDone: true}   // task
            ],
        // id todolist-а 2:
        [todolistId2]:
        // таски
        // 2 - second array tasks:
            [
                {id: v1(), title: "Book", isDone: true}, // task
                {id: v1(), title: "Milk", isDone: true},   // task
            ],
    })

    function changeFilter(filterValue: FilterValueType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
        }
        setTodolists([...todolists])
    }

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist =  todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }

    }

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter(t => t.id !== todolistId)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todolistId]
        const newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }
    function changeTaskTitle(todolistId: string,taskId: string, newTitle: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function addTodolist(newTitle: string) {
        const newTodolist: TodolistType = {id: todolistId1, title: newTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        //добавляем еще одно свойство - таски для нового тудулиста - название которого id
        // сгенерированного тудулиста {id: todolistId1, title: newTitle, filter: "all"}
        setTasks({...tasksObj, [newTodolist.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolists.map((tl) => {
                // функция вызовется столько раз сколько объектов в тудулисте
                let tasksForTodolist = tasksObj[tl.id]

                if (tl.filter === "completed") tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone)

                if (tl.filter === "completed") tasksForTodolist = tasksObj[tl.id].filter(t => !t.isDone)

                return <Todolist
                    todolistId={tl.id}
                    key={tl.id}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                />
            })}
        </div>
    );
}

export default App;
