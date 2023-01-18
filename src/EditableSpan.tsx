import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode,setEditMode] = useState(false)
    const [title,setTitle] = useState('')

    const activateEditeMode = () => {
        setEditMode(true)
        // при активации режима редактирования установим title в то значение
        // которое актуальное сидит в пропсах - к нам пришло...
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        // передаем родителю значение что напечаталось
        props.onChange(title)
    }
    const onTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onBlur={ activateViewMode } autoFocus={true} onChange={onTittleChangeHandler}/>
        : <span onDoubleClick={ activateEditeMode }>{props.title}</span>
}


// onBlur - кликаем мимо... убираем фокус с инпута на span
// когда инпут появляется чтобы сразу фокус был там autoFocus