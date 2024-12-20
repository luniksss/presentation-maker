import { generateRandomId } from "./data";
import { Editor } from "./EditorType";
import { ImageElement } from "./PresentationType";

function addImageElement(editor: Editor): Editor {
    const newElement : ImageElement = {
        id: generateRandomId(),
        size: {width: 200, height: 200}, 
        position: {x: 0, y: 0}, 
        isSelected: true,
        type: 'image', 
        src: "/assets/newTestImg.jpg"
    }
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
        },
        selection: {
            ...editor.selection,
            slideId: selectedSlideId,
            elementId: newElement.id
        }
    }
}

export { addImageElement }