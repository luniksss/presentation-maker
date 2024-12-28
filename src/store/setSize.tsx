import { Editor } from "./EditorType";
import { Size } from "./PresentationType";

const setSize = (editor: Editor, newSize: Size): Editor => {

    const selectedElementId = editor.selection.elementId;
    const selectedSlideId = editor.selection.slideId;

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === selectedSlideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === selectedElementId) {
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