import { Editor } from "./EditorType"
import { SlideType } from "./PresentationType";

function setSlides(editor: Editor, newSlides: SlideType[]): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: {
            ...editor.selection,
            
        }
    };
}

export { setSlides }