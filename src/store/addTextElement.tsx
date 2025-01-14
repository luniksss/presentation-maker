import { Editor } from "./EditorType"
import { generateRandomId } from "./data"
import { TextElement } from "./PresentationType"
import { BLACK_COLOR, DEFAULT_FONTCONTENT, DEFAULT_FONTFAMILY, DEFAULT_FONTSIZE, DEFAULT_SCALE } from "../consts";

function addTextElement(editor: Editor): Editor {
    const newElement : TextElement = {
        id: generateRandomId(),
        size: {width: 90, height: 50}, 
        position: {x: 10, y: 10}, 
        isSelected: true,
        type: 'text', 
        content: DEFAULT_FONTCONTENT, 
        fontSize: DEFAULT_FONTSIZE, 
        fontFamily: DEFAULT_FONTFAMILY,
        color: BLACK_COLOR
    }

    const selectedSlideId = editor.selection.slideIds?.[0]
    if (!selectedSlideId) {
        return editor
    }

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
                ...editor.presentation.slides.slice(selectedSlideIndex + DEFAULT_SCALE)
            ]
        },
        selection: {
            ...editor.selection,
            slideIds: [selectedSlideId],
            elementId: newElement.id
        }
    }
}

export { addTextElement }