import { Selection } from "../EditorType";
import { Position } from "../PresentationType";
import { ActionType } from "./actions";

function setSelection(newSelection: Selection) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}

function setPosition(newPosition: Position) {
    return {
        type: ActionType.SET_POSITION,
        payload: newPosition,
    }
}

export {
    setSelection,
    setPosition
}