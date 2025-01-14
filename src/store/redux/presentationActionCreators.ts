import { ActionType } from "./actions"

function changeTitle(newTitle: string) {
    return {
        type: ActionType.CHANGE_TITLE,
        payload: newTitle
    }
}

function exportData() {
    return {
        type: ActionType.EXPORT_DATA,
    }
}

function downloadPDF() {
    return {
        type: ActionType.DOWNLOAD_PDF,
    }
}

function importData(inputEditor: object) {
    return {
        type: ActionType.IMPORT_DATA,
        payload: inputEditor,
    }
}

export {
    changeTitle,
    exportData,
    downloadPDF,
    importData,
}