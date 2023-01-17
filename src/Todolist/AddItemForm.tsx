import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.keyCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTask = () => {
        // если то что ввели в поле пустая строка или ничего не ввели - trim() обрежет пробелы
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
        setError("Поле обязательно")
    }


    return <>
        <input
            className={error ? "error" : ""}
            value={newTaskTitle}
            onKeyDown={onNewTitleKeyDownHandler}
            onChange={onNewTitleChangeHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </>

}