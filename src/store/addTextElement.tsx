import { Editor } from "./EditorType";
import { generateRandomId } from "./data";
import { TextElement } from "./PresentationType";

function addTextElement(editor: Editor): Editor {
    const newElement : TextElement = {
        id: generateRandomId(),
        size: {width: 300, height: 200}, 
        position: {x: 10, y: 10}, 
        isSelected: true,
        type: 'text', 
        content: "Your text", 
        fontSize: 14, 
        fontFamily: "Times New Roman"
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
        }
    }
}

export { addTextElement }