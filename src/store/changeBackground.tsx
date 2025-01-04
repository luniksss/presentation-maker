import { Editor } from "./EditorType";

function changeBackground(editor: Editor, newBackground: string): Editor {
    const selectedSlideId = editor.selection.slideId
    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === selectedSlideId)    
    const updatedSlides = editor.presentation.slides.map((slide, index) => {
        if (index === selectedSlideIndex) {
            return {
                ...slide,
                background: newBackground
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
}
 
export { changeBackground }