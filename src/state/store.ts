import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./task.reducer";
import {todolistsReducer} from "./todolists.reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// рутовый редюсер будет получать все экшены и раскидывать экшены по нужным редюсерам
// полученный экшн прогоняется по всем редюсерам
// store - единое хранилище глобальное состоящее из множества подстейтов
// - хранятся в своих редюсерах подстейты в инишлвелью

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer);

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;