import { Editor } from "./EditorType";
import { TextElement } from "./PresentationType";

function editTextColor(editor: Editor, newColor: string): Editor {
    const selectedSlideId = editor.selection.slideIds?.[0];
    const selectedElementId = editor.selection.elementId;

    if (selectedSlideId === null || selectedElementId === null || !selectedSlideId) {
        return editor;
    }

    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId);
    const selectedSlide = editor.presentation.slides[slideIndex];
    const elementIndex = selectedSlide.elements.findIndex(element => element.id === selectedElementId);
    
    if (elementIndex === -1 || selectedSlide.elements[elementIndex].type !== 'text') {
        return editor;
    }

    const updatedElements = selectedSlide.elements.map((element, index) => {
        if (index === elementIndex) {
            const textElement = element as TextElement;
            return {
                ...textElement,
                color: newColor
            };
        }
        return element;
    });

    const updatedSlide = {
        ...selectedSlide,
        elements: updatedElements,
    };

    const updatedSlides = [...editor.presentation.slides];
    updatedSlides[slideIndex] = updatedSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

export { editTextColor };