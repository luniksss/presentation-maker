import { Editor } from "./EditorType"

function removeSlide(editor: Editor): Editor {
    if (!editor.selection) {
        return editor        
    }

    const removeSlideIds = editor.selection.slideIds
    if (!removeSlideIds) {
        return editor
    }

    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === removeSlideIds[0])
    const newSlides = editor.presentation.slides.filter(slide => !removeSlideIds.includes(slide.id))
    
    let newSelectedSlideId = null
    if (newSlides.length > 0) {
        if (removeSlideIndex < newSlides.length) {
            newSelectedSlideId = [newSlides[removeSlideIndex].id]
        } else {
            newSelectedSlideId = [newSlides[newSlides.length - 1].id]
        }
    } else {
        newSelectedSlideId = null
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            slideIds: newSelectedSlideId,
        },
    }
}

export { removeSlide }