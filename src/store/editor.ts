import { editor } from "./data";

let _editor = editor
let _handler: (() => void) | null = null;

function getEditor() {
    return _editor
}

function setEditor(newEditor: typeof _editor) {
    _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
    console.log(newEditor)
}

function addEditorChangeHandler(handler: () => void): void {
    _handler = handler
}

export { getEditor, dispatch, addEditorChangeHandler, }