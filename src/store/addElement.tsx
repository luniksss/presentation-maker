import { Editor } from "./EditorType";
import { Component } from "./PresentationType";

function addElement(editor: Editor, newElement: Component) {
    const selectedSlideId = editor.selection.slideId
    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId)
    const newElements = [...editor.presentation.slides[selectedSlideIndex].elements, newElement]
    const currentSlide = editor.presentation.slides[selectedSlideIndex]
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selectedSlideIndex),
                { ...currentSlide, elements: newElements },
                ...editor.presentation.slides.slice(selectedSlideIndex + 1)
            ]
        }
    }
}

export { addElement }