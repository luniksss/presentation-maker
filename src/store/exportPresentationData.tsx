import { Editor } from "./EditorType"

function exportPresentationData(editor: Editor): Editor {
    const editorData = JSON.stringify(editor)
    const blob = new Blob([editorData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const presentationName = editor.presentation.title
    
    const a = document.createElement('a')
    a.href = url
    presentationName !== '' ? a.download = `${presentationName}.json` : a.download = "presentation.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return {...editor}
}

export { exportPresentationData }