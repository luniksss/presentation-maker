import { Presentation } from "./PresentationType"

type Selection = {
    slideIds: string[] | null
    elementId: string | null
}

type Editor = {
    presentation: Presentation
    selection: Selection
}

export type { Editor, Selection, }