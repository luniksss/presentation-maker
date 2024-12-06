import { Editor } from "./EditorType";

function deleteElement(editor: Editor): Editor {
    if (!editor.selection) {
        return editor        
    }

    const selectedSlideId = editor.selection.slideId;
    const removedObjectId = editor.selection.elementId;
    const selectedSlide = editor.presentation.slides.find(slide => slide.id === selectedSlideId);

    const newElements = selectedSlide?.elements.filter(slide => slide.id !== removedObjectId) || []
    let newSelectedObjectId = null;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => 
                slide.id === selectedSlideId ? {
                    ...slide, 
                    elements: newElements,
                } : slide
            ),
        },
        selection: {
            slideId: selectedSlideId,
            elementId: newSelectedObjectId
        },
    };
}

export { deleteElement }