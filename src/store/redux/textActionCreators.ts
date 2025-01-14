import { ActionType } from "./actions"

function editTextFontSize(newSize: number) {
    return {
        type: ActionType.EDIT_FONTSIZE,
        payload: newSize
    }
}

function editTextColor(newColor: string) {
    return {
        type: ActionType.EDIT_FONT_COLOR,
        payload: newColor
    }
}

function updateTextContent(newContent: string) {
    return {
        type: ActionType.EDIT_TEXT,
        payload: newContent
    }
}

export {
    editTextFontSize,
    editTextColor,
    updateTextContent,
}