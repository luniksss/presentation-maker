import { Presentation } from "./PresentationType";


type Selection = {
    slideId: string;
    elementId: string | null;
}

type Editor = {
    presentation: Presentation,
    selection: Selection,
}

export type { Editor, Selection, }