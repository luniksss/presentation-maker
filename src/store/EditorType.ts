import { Presentation } from "./PresentationType";


type Selection = {
    slideId: string | null;
    elementId: string | null;
}

type Editor = {
    presentation: Presentation,
    selection: Selection,
}

export type { Editor, Selection, }