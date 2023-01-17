import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onNewTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.keyCode === 13) {
            props.addItem(newTitle)
            setNewTitle("")
        }
    }

    const addItem = () => {
        // если то что ввели в поле пустая строка или ничего не ввели - trim() обрежет пробелы
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        }
        setError("Поле обязательно")
    }


    return (
        <>
            <input
                className={error ? "error" : ""}
                value={newTitle}
                onKeyDown={onNewTitleKeyDownHandler}
                onChange={onNewTitleChangeHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </>
    )
}