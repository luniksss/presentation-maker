import { Editor } from "../EditorType";
import { setSelection } from "../setSelection";
import { ActionType, EditorAction, PresentationAction } from "./actions";
import { startPresentation } from "../data";
import { removeSlide } from "../removeSlide";
import { addSlide } from "../addSlide";
import { addTextElement } from "../addTextElement";
import { addImageElement } from "../addImageElement";
import { renamePresentation } from "../renamePresentation";
import { deleteElement } from "../deleteElement";
import { changeBackground } from "../changeBackground";
import { exportPresentationData } from "../exportPresentationData";
import { importPresentationData } from "../importPresentationData";
import { exportPresentation } from "../downloadPDF";
import { setSlides } from "../setSlides";

function editorReducer(editor: Editor = startPresentation, action: EditorAction | PresentationAction): Editor {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.ADD_TEXT:
            return addTextElement(editor)
        case ActionType.ADD_IMAGE:
            return addImageElement(editor)
        case ActionType.REMOVE_ELEMENT:
            return deleteElement(editor)
        case ActionType.CHANGE_BACKGROUND:
            return changeBackground(editor, action.payload)
        case ActionType.SET_SELECTION: 
            return setSelection(editor, action)
        case ActionType.SET_SLIDES_ORDER: 
            return setSlides(editor, action.payload)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.UPDATE_EDITOR:
            return action.payload
        case ActionType.CHANGE_TITLE:
            return renamePresentation(editor, action.payload)
        case ActionType.EXPORT_DATA:
            return exportPresentationData(editor)
        case ActionType.IMPORT_DATA:
            return importPresentationData(editor, action.payload)
        case ActionType.DOWNLOAD_PDF:
            return exportPresentation(editor)
        default:
            return editor
    }
}

export {
    editorReducer,
}