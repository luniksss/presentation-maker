import { SlideType } from "../PresentationType"
import { ActionType } from "./actions"

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function addTextElement() {
    return {
        type: ActionType.ADD_TEXT,
    }
}

function addImageElement() {
    return {
        type: ActionType.ADD_IMAGE,
    }
}

function removeElement() {
    return {
        type: ActionType.REMOVE_ELEMENT,
    }
}

function changeBackground(newBackground: string) {
    return {
        type: ActionType.CHANGE_BACKGROUND,
        payload: newBackground,
    }
}

function setSlidesOrder(newSlides: SlideType[]) {
    return {
        type: ActionType.SET_SLIDES_ORDER,
        payload: newSlides,
    }
}

export {
    addSlide,
    removeSlide,
    addTextElement,
    addImageElement,
    removeElement,
    changeBackground,
    setSlidesOrder
}