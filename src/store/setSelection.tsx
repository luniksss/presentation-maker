import { Editor } from "./EditorType"
import { SetSelectionAction } from "./redux/actions"

function setSelection(editor: Editor, selection: SetSelectionAction): Editor {
    return {
            ...editor,
            selection: selection.payload
        }
}

export { setSelection }