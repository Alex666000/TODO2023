import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onNewTitleChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onNewTitleChange(title)
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <input
            type="text"
            value={title}
            onChange={onNewTitleChangeHandler}
            onBlur={activateViewMode}
            autoFocus/>
        : <span
            onDoubleClick={activateEditMode}>{props.title}</span>

}