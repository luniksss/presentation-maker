import { Editor } from "./EditorType";
import { parsingEditor } from "./parsingEditor";

function importPresentationData(editor: Editor, inputEditor: object) 
{
    if (parsingEditor(inputEditor)) {
        return inputEditor
    } else {
        alert('что вы подсунули?')
        return {...editor}
    }

}

export { importPresentationData }