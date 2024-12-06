import { Selection } from "../EditorType";
import { ActionType } from "./actions";

function setSelection(newSelection: Selection) {
    return {
        type: ActionType.SET_SELECTION,
        payload: newSelection,
    }
}

export {
    setSelection,
}