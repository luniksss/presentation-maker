import { DEFAULT_SCALE } from "../consts"
import { generateRandomId } from "./data"
import { Editor } from "./EditorType"
import { ImageElement } from "./PresentationType"

function addImageElement(editor: Editor, newImage: string): Editor {
    const newElement: ImageElement = {
        id: generateRandomId(),
        size: { width: 300, height: 300 },
        position: { x: 0, y: 0 },
        isSelected: true,
        type: 'image',
        src: newImage
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

export { addImageElement }