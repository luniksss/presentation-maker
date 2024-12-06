import { Editor } from "../EditorType";
import { ActionType } from "./actions";

function setEditor(newEditor: Editor) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function updateEditor(newEditor: Editor)
{
    return {
        type: ActionType.UPDATE_EDITOR,
        payload: newEditor,
    };
};

export {
    setEditor, updateEditor
}