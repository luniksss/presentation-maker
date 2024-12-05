import { editor } from "./data";
import { Editor } from "./EditorType";
import { parsingEditor } from "./parsingEditor";

let _editor = editor.editorData;
let _handler: (() => void) | null = null;

function getEditor() {
    if (parsingEditor(_editor)) {
        return _editor
    } else {
        return editor.editorData;
    }
}

function setEditor(newEditor: typeof _editor) {
    _editor = newEditor
}

function saveToLocalStorage(data: Editor) {
    localStorage.setItem('presentationData', JSON.stringify(data));
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);
    saveToLocalStorage(newEditor);

    if (_handler) {
        _handler();
    }
}

function addEditorChangeHandler(handler: () => void): void {
    _handler = handler
}

export { getEditor, dispatch, addEditorChangeHandler, }