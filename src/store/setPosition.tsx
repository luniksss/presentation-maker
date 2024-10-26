import { Editor } from "./EditorType"

function setSelection(editor: Editor, position: {x: number, y: number}) {

    const selectedSlideId = editor.selection.slideId;
    const selectedObjectId = editor.selection.elementId;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => 
                slide.id === selectedSlideId ? {
                    ...slide, 
                    elements: slide.elements.map(element => 
                        element.id === selectedObjectId ? {
                            ...element,
                            position: position
                        } : element
                    ),
                } : slide
            ),
        },
        selection: {
            slideId: selectedSlideId,
            elementId: selectedObjectId
        },
    };
}

export { setSelection }