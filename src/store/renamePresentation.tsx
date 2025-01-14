import { Editor } from "./EditorType"

function renamePresentation(editor: Editor, newTitle: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

export { renamePresentation }