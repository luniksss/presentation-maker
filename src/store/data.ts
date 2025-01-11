import { Editor } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

function generateRandomId(length: number = 8): string { 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    let result = ''; 
 
    for (let i = 0; i < length; i++) { 
        const randomIndex = Math.floor(Math.random() * characters.length); 
        result += characters[randomIndex]; 
    } 
 
    return result; 
}

let startSlide: SlideType = {
    id: generateRandomId(),
    background: "#fff",
    elements: [ ]
}

const defaultPresentation: Presentation = {
    title: "New Presentation",
    slides: [
        startSlide,
    ]
};

const schema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                title: { type: "string" },
                slides: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            background: { type: "string"},
                            elements: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: ["integer", "string"] },
                                                height: { type: ["integer", "string"] }
                                            },
                                            required: ["width", "height"],
                                            additionalProperties: false
                                        },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "integer" },
                                                y: { type: "integer" }
                                            },
                                            required: ["x", "y"],
                                            additionalProperties: false
                                        },
                                        type: { type: "string" },
                                        src: { type: "string" },
                                        content: { type: "string" },
                                        fontSize: { type: "integer" },
                                        fontFamily: { type: "string" },
                                        isSelected: { type: "boolean" }
                                    },
                                    required: ["id", "size", "position", "type"],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ["id", "background", "elements"],
                        additionalProperties: false
                    }
                }
            },
            additionalProperties: true
        },
        selection: {
            type: "object",
            properties: {
                slideIds: { type: "array", items: { type: ["string", "null"]} },
                elementId: { type: ["string", "null"] }
            },
            required: ["slideIds"],
            additionalProperties: false
        }
    },
    required: ["presentation", "selection"],
    additionalProperties: false
};

function loadFromLocalStorage(): Editor | null {
    const savedData = localStorage.getItem('presentationData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return null;
}

const savedEditorData = loadFromLocalStorage();
let startPresentation: Editor = {
    presentation: defaultPresentation,
    selection: {
        slideIds: [defaultPresentation.slides[0].id],
        elementId: null
    }
};
if (savedEditorData !== null) {
    startPresentation = savedEditorData;
}

const editor = { editorData: startPresentation };
const handler = {}

export { editor, handler, schema, defaultPresentation, startPresentation, startSlide, generateRandomId }