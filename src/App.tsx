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
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolists[]>([
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "Learn and listen", filter: "all"},
        ]
    )
    const [tasksObj, setTasks] = useState({
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
        // удаляем таки для удаленного тудулиста
        delete tasksObj[todolistId]
        //  устанавливаем новый объект в стейт
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        // находим нужный массив с таской
        const tasks = tasksObj[todolistId]
        // в этом массиве получаем отфильтрованные таски
        const filteredTasks = tasks.filter(t => t.id !== todolistId)
        // перезапишем таски которые достали отфильтрованными тасками
        tasksObj[todolistId] = filteredTasks
        // и отправляем новый объект tasksObj в setTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        // создали новую таску - ее теперь надо добавить - куда?
        const newTask = {id: v1(), title: title, isDone: false}
        // находим нужный массив с таской (дин из 2-x, либо этот либо тот...)
        const tasks = tasksObj[todolistId]
        // в этот массив добавим таску
        const newTasks = [newTask, ...tasks]
        // новые таски засовываю обратно по такому ключу tasksObj[todolistId] в объект
        tasksObj[todolistId] = newTasks
        // и отправляем новый объект tasksObj в setTasks
        setTasks({...tasksObj})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        // находим нужный массив с таской
        const tasks = tasksObj[todolistId]
        // в этом массиве тасок нашли нужную таску
        const task = tasks.find(t => t.id === taskId)
        // если она нашлась её изменили
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                // функция вызовется столько раз сколько объектов в тудулисте
                let tasksForTodolist = tasksObj[tl.id]

// фильтр берем из тудулиста
                if (tl.filter === "completed") tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone)

                if (tl.filter === "completed") tasksForTodolist = tasksObj[tl.id].filter(t => !t.isDone)

                return <Todolist
                    todolistId={tl.id}
                    key={tl.id}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                />
            })}
        </div>
    );
}

export default App;
