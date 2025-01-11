import { Editor } from "./EditorType";
import { Size } from "./PresentationType";

const setSize = (editor: Editor, newSize: Size): Editor => {
    if (!editor.selection) {
        return editor;        
    }
    
    const slideId = editor.selection.slideIds?.[0];
    const elementId = editor.selection.elementId;

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === elementId) {
                        return {
                            ...element,
                            size: newSize
                        };
                    }
                    return element;
                }),
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export { setSize }