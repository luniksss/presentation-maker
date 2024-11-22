import { Editor } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

let slide1: SlideType = {
    id: "ASusf",
    background: "#fff",
    elements: [
        {
            id: "d174k",
            type: 'text',
            content: "Hello World",
            fontSize: 24,
            fontFamily: "Arial",
            size: { width: 300, height: 100 },
            position: { x: 100, y: 150 },
            isSelected: false,
        },
        {
            id: "0kto2v",
            type: 'image',
            src: "/assets/testImg.jpg",
            size: { width: 300, height: 300 },
            position: { x: 400, y: 50 },
            isSelected: false,
        }
    ]
}

let slide2: SlideType = {
    id: "kvhua",
    background: "#fff",
    elements: [
        {
            id: "Koem7",
            type: 'text',
            content: "Yo Yo Yo",
            fontSize: 24,
            fontFamily: "Arial",
            size: { width: 300, height: 100 },
            position: { x: 100, y: 150 },
            isSelected: false,
        },
        {
            id: "0qnu78",
            type: 'image',
            src: "/assets/newTestImg.jpg",
            size: { width: 200, height: 250 },
            position: { x: 500, y: 100 },
            isSelected: false,
        }
    ]
}

export const presentation: Presentation = {
    title: "My First Try",
    slides: [
        slide1,
        slide2,
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