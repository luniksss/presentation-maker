import { Editor } from "./EditorType";

function removeSlide(editor: Editor): Editor {
    if (!editor.selection) {
        return editor        
    }

    const removeSlideId = editor.selection.slideId
    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === removeSlideId)

    const newSlides = editor.presentation.slides.filter(slide => slide.id !== removeSlideId)
    
    let newSelectedSlideId = null
    if (newSlides.length > 0) {
        if (removeSlideIndex < newSlides.length) {
            newSelectedSlideId = newSlides[removeSlideIndex].id;
        } else {
            newSelectedSlideId = newSlides[newSlides.length - 1].id;
        }
    } else {
        newSelectedSlideId = null; 
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            slideId: newSelectedSlideId,
        },
    };
}

export { removeSlide }