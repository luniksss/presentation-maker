import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { editorReducer } from "./editorReducer"
import localStorageMiddleware from "./localStorage"
import LZString from "lz-string"

const store = createStore(
    editorReducer,
    applyMiddleware(localStorageMiddleware)
);

export {
    store
}