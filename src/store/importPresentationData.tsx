import { Editor } from "./EditorType"
import { parsingEditor } from "./parsingEditor"

function importPresentationData(editor: Editor, inputEditor: object): Editor
{
    if (parsingEditor(inputEditor)) {
        return {
            ...editor, 
            ...inputEditor
        }
    } else {
        alert('что вы подсунули?')
        return {...editor}
    }

}

export { importPresentationData }