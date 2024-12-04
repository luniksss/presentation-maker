import { Editor } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

let slide1: SlideType = {
    id: "ASusf",
    background: "#fff",
    elements: [ ]
}

export const presentation: Presentation = {
    title: "New Presentation",
    slides: [
        slide1,
    ]
};

const editor: Editor = {
    presentation,
    selection: {
        slideId: presentation.slides[0].id,
        elementId: "0"
    }
}

const handler = {}

export { editor, handler }