import { generateRandomId } from "./data";
import { Editor } from "./EditorType";
import { SlideType } from "./PresentationType";

function addSlide(editor: Editor): Editor {
    const newSlide : SlideType = {
        id: generateRandomId(),
        background: "#fff",
        elements: [ ]
    };
    const newSlideList = [...editor.presentation.slides, newSlide];

    return { ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlideList,
        },
        selection: {
            slideIds: [newSlide.id],
            elementId: null,
        }
    }
}

export { addSlide }