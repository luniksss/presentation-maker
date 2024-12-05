import { Editor } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

let slide1: SlideType = {
    id: "ASusf",
    background: "#fff",
    elements: [ ]
}

const defaultPresentation: Presentation = {
    title: "New Presentation",
    slides: [
        slide1,
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
            required: ["title", "slides"],
            additionalProperties: false
        },
        selection: {
            type: "object",
            properties: {
                slideId: { type: "string" },
                elementId: { type: ["string", "null"] }
            },
            required: ["slideId"],
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
        slideId: defaultPresentation.slides[0].id,
        elementId: "0"
    }
};
if (savedEditorData !== null) {
    startPresentation = savedEditorData;
}

const editor = { editorData: startPresentation };
const handler = {}

export { editor, handler, schema, defaultPresentation }