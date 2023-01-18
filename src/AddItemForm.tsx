import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

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
        <TextField
            variant={'outlined'}
            // если ошибка будет  текст покажется - используем вместо такой строки:
            // {error && <div className={"error-message"}>{error}</div>}
            helperText={error}
            label={'type value'}
            // className={error ? "error" : ""}
            error={!!error} // если строка существет тогда  error
            // превратили строку error в булево значение с !!
            value={newTaskTitle}
            onKeyDown={onNewTitleKeyDownHandler}
            onChange={onNewTitleChangeHandler}
        />
        <Button
            variant={'contained'}
            color={'primary'}
            onClick={addTask}>+</Button>
        {/*{error && <div className={"error-message"}>{error}</div>}*/}
    </>

}