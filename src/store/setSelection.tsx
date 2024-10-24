import { Editor } from "./EditorType"

function setSelection(editor: Editor, selection: Selection) {
    return {
            ...editor,
            selection: selection
        };
}

export { setSelection }