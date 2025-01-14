import { generateRandomId } from "./data"
import { Editor } from "./EditorType"
import { SlideType } from "./PresentationType"

function addSlide(editor: Editor): Editor {
    const newSlide: SlideType = {
        id: generateRandomId(),
        background: "#fff",
        elements: [],
    };

    const slides = editor.presentation.slides
    const selectedSlideIds = editor.selection.slideIds || []
    const lastSelectedIndex = slides.findIndex(slide => slide.id === selectedSlideIds[selectedSlideIds.length - 1])

    if (lastSelectedIndex === -1) {
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: [...slides, newSlide],
            },
            selection: {
                slideIds: [newSlide.id],
                elementId: null,
            },
        }
    }

    const newSlideList = [
        ...slides.slice(0, lastSelectedIndex + 1),
        newSlide,
        ...slides.slice(lastSelectedIndex + 1),
    ]

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlideList,
        },
        selection: {
            slideIds: [newSlide.id],
            elementId: null,
        },
    }
}

export { addSlide }