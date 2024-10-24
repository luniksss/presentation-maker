import { Presentation } from "./PresentationType";


type Selection = {
    slideId: number;
    elementId?: number;
}

type Editor = {
    presentation: Presentation,
    selection: Selection,
}

export type { Editor, Selection, }