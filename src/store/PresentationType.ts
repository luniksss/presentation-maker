type Size = {
    width: number;
    height: number;
}

type Position = {
    x: number;
    y: number;
}

type Elem = {
    id: string;
    size: Size;
    position: Position;
    isSelected: boolean;
}

type TextElement = Elem & {
    type: 'text',
    content: string;
    fontSize: number;
    fontFamily: string;
}

type ImageElement = Elem & {
    type: 'image',
    src: string;
}

type Component = TextElement | ImageElement;

type SlideType = {
    id: string;
    background: string;
    elements: Component[];
}

type Presentation = {
    title: string;
    slides: SlideType[];
}

export type { Presentation, SlideType, Component, TextElement, ImageElement, };