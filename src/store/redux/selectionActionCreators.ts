import { Selection } from "../EditorType";
import { Position, Size } from "../PresentationType";
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

function setSize(newSize: Size) {
    return {
        type: ActionType.SET_SIZE,
        payload: newSize,
    }
}

export {
    setSelection,
    setPosition,
    setSize,
}