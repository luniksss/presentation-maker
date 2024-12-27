import { Editor, Selection } from "../EditorType"
import { SlideType } from "../PresentationType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    ADD_TEXT = 'addTextElement',
    ADD_IMAGE = 'addImageElement',
    REMOVE_ELEMENT = 'removeElement',
    CHANGE_BACKGROUND = 'changeBackground',

    SET_SELECTION = 'setSelection',
    SET_SLIDES_ORDER = 'setSlides',

    SET_EDITOR = 'setEditor',
    UPDATE_EDITOR = 'updateEditor',
    
    CHANGE_TITLE = 'changeTitle',
    EXPORT_DATA = 'exportPresentation',
    DOWNLOAD_PDF = 'downloadPDF',
    IMPORT_DATA = 'importPresentation',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type AddTextAction = {
    type: ActionType.ADD_TEXT,
}

type AddImageAction = {
    type: ActionType.ADD_IMAGE,
}

type RemoveElementAction = {
    type: ActionType.REMOVE_ELEMENT,
}

type ChangeBackgroundAction = {
    type: ActionType.CHANGE_BACKGROUND,
    payload: string,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: Selection,
}

type SetSlidesOrderAction = {
    type: ActionType.SET_SLIDES_ORDER,
    payload: SlideType[],
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: Editor,
}

type UpdateEditorAction = {
    type: ActionType.UPDATE_EDITOR,
    payload: Editor,
}

type ChangeTitleAction = {
    type: ActionType.CHANGE_TITLE,
    payload: string,
}

type ExportDataAction = {
    type: ActionType.EXPORT_DATA,
}

type DownloadPresentation = {
    type: ActionType.DOWNLOAD_PDF,
}

type ImportDataAction = {
    type: ActionType.IMPORT_DATA,
    payload: object,
}

type EditorAction = AddSlideAction | RemoveSlideAction | AddTextAction | AddImageAction | RemoveElementAction | ChangeBackgroundAction | SetSelectionAction | SetSlidesOrderAction | SetEditorAction | UpdateEditorAction
type PresentationAction = ChangeTitleAction | ExportDataAction | DownloadPresentation | ImportDataAction
export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
    type PresentationAction,
}