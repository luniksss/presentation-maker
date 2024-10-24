import { Editor } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

let slide1: SlideType = {
    id: 0,
    background: "#fff",
    elements: [
        {
            id: 0,
            type: 'text',
            content: "Hello World",
            fontSize: 24,
            fontFamily: "Arial",
            size: { width: 300, height: 100 },
            position: { x: 100, y: 150 }
        },
        {
            id: 1,
            type: 'image',
            src: "/assets/testImg.jpg",
            size: { width: 300, height: 300 },
            position: { x: 400, y: 50 }
        }
    ]
}

let slide2: SlideType = {
    id: 1,
    background: "#8A817C",
    elements: [
        {
            id: 2,
            type: 'text',
            content: "Yo Yo Yo",
            fontSize: 24,
            fontFamily: "Arial",
            size: { width: 300, height: 100 },
            position: { x: 100, y: 150 }
        },
        {
            id: 3,
            type: 'image',
            src: "/assets/newTestImg.jpg",
            size: { width: 200, height: 250 },
            position: { x: 500, y: 100 }
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
    }
}

const handler = {}

export { editor, handler }