import { Editor } from "./EditorType";

function renamePresentation(editor: Editor, newTitle: string) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

export { renamePresentation, }