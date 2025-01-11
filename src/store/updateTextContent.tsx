import { Editor } from "./EditorType";

const updateTextContent = (editor: Editor, newContent: string): Editor => {
    if (!editor.selection) {
        return editor;        
    }
    
    const slideId = editor.selection.slideIds?.[0];
    const elementId = editor.selection.elementId;

    const newSlides = editor.presentation.slides.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                elements: slide.elements.map(element => {
                    if (element.id === elementId) {
                        return {
                            ...element,
                            content: newContent
                        };
                    }
                    return element;
                }),
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export { updateTextContent }