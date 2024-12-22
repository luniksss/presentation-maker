import { Position } from "../PresentationType"
import { ActionType } from "./actions"

function setPosition(newPosition: Position) {
    return {
        type: ActionType.SET_POSITION,
        payload: newPosition,
    }
}

export {
    setPosition,
}