import { Editor } from "./EditorType";
import { Position } from "./PresentationType";

function setPosition(editor: Editor, newPosition: Position) {
    if (!editor.selection) {
        return editor;        
    }
    
    const { slideId, elementId } = editor.selection;
    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id !== slideId) {
            return slide;
        }
        const updatedElements = slide.elements.map(element => {
            if (element.id !== elementId) {
                return element;
            }
            return {
                ...element,
                position: newPosition,
            };
        });

        return {
            ...slide,
            elements: updatedElements,
        };
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

export { setPosition };