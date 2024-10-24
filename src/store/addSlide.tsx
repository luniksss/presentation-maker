import { Editor } from "./EditorType";
import { SlideType } from "./PresentationType";

function addSlide(editor: Editor, newSlide: SlideType) {
    const newSlides = [...editor.presentation.slides, newSlide];

    return { 
        ...editor, 
        presentation: { 
            ...editor.presentation, 
            slides: newSlides 
        }
    };
}

export { addSlide }