import { Position, Size } from "../PresentationType"
import { ActionType } from "./actions"

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
    setPosition,
    setSize,
}